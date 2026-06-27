extends Node2D

signal game_over(score: int, max_combo: int)

const TARGET_SCRIPT := preload("res://scripts/Target.gd")

var score: int = 0
var combo: int = 0
var max_combo: int = 0
var lives: int = 3
var level: int = 1
var spawn_timer: float = 0.0
var spawn_interval: float = 1.8
var active: bool = false
var paused: bool = false

var shake_intensity: float = 0.0
var shake_timer: float = 0.0

var camera: Camera2D
var target_layer: Node2D
var hud_layer: CanvasLayer
var pause_layer: CanvasLayer

var score_label: Label
var combo_label: Label
var lives_label: Label
var level_label: Label
var combo_scale_tween: Tween

func _ready() -> void:
	_build_scene()
	_start()

func _build_scene() -> void:
	var vp := get_viewport().get_visible_rect().size

	# Background
	var bg := ColorRect.new()
	bg.color = Color(0.04, 0.02, 0.08)
	bg.size = vp
	add_child(bg)

	# Background grid (drawn in a custom node)
	var grid := _GridNode.new()
	grid.vp_size = vp
	add_child(grid)

	# Camera
	camera = Camera2D.new()
	add_child(camera)
	camera.make_current()

	# Targets
	target_layer = Node2D.new()
	target_layer.process_mode = Node.PROCESS_MODE_PAUSABLE
	add_child(target_layer)

	# HUD (always on top, not affected by camera)
	hud_layer = CanvasLayer.new()
	hud_layer.layer = 10
	hud_layer.process_mode = Node.PROCESS_MODE_ALWAYS
	add_child(hud_layer)
	_build_hud(vp)

	# Pause overlay
	pause_layer = CanvasLayer.new()
	pause_layer.layer = 20
	pause_layer.visible = false
	pause_layer.process_mode = Node.PROCESS_MODE_ALWAYS
	add_child(pause_layer)
	_build_pause_overlay(vp)

func _build_hud(vp: Vector2) -> void:
	var panel := ColorRect.new()
	panel.color = Color(0.0, 0.0, 0.0, 0.55)
	panel.size = Vector2(vp.x, 88)
	hud_layer.add_child(panel)

	# Score
	score_label = Label.new()
	score_label.text = "0"
	score_label.position = Vector2(20, 8)
	score_label.add_theme_font_size_override("font_size", 52)
	score_label.add_theme_color_override("font_color", Color.CYAN)
	hud_layer.add_child(score_label)

	var score_sub := Label.new()
	score_sub.text = "SCORE"
	score_sub.position = Vector2(26, 66)
	score_sub.add_theme_font_size_override("font_size", 12)
	score_sub.add_theme_color_override("font_color", Color(0.4, 0.75, 1.0, 0.7))
	hud_layer.add_child(score_sub)

	# Combo (centered)
	combo_label = Label.new()
	combo_label.text = ""
	combo_label.position = Vector2(vp.x * 0.5 - 70, 18)
	combo_label.add_theme_font_size_override("font_size", 34)
	combo_label.add_theme_color_override("font_color", Color(1.0, 0.85, 0.0))
	hud_layer.add_child(combo_label)

	# Level
	level_label = Label.new()
	level_label.text = "LV 1"
	level_label.position = Vector2(vp.x * 0.5 - 28, 60)
	level_label.add_theme_font_size_override("font_size", 12)
	level_label.add_theme_color_override("font_color", Color(0.7, 0.5, 1.0, 0.8))
	hud_layer.add_child(level_label)

	# Lives (right side)
	lives_label = Label.new()
	lives_label.text = "♥♥♥"
	lives_label.position = Vector2(vp.x - 160, 16)
	lives_label.add_theme_font_size_override("font_size", 38)
	lives_label.add_theme_color_override("font_color", Color(1.0, 0.2, 0.35))
	hud_layer.add_child(lives_label)

	var lives_sub := Label.new()
	lives_sub.text = "LIVES"
	lives_sub.position = Vector2(vp.x - 136, 66)
	lives_sub.add_theme_font_size_override("font_size", 12)
	lives_sub.add_theme_color_override("font_color", Color(1.0, 0.4, 0.5, 0.7))
	hud_layer.add_child(lives_sub)

	# Controls hint (bottom)
	var hint := Label.new()
	hint.text = "ESC/P = Pause   R = Restart"
	hint.position = Vector2(vp.x - 310, vp.y - 28)
	hint.add_theme_font_size_override("font_size", 12)
	hint.add_theme_color_override("font_color", Color(0.4, 0.4, 0.4))
	hud_layer.add_child(hint)

func _build_pause_overlay(vp: Vector2) -> void:
	var overlay := ColorRect.new()
	overlay.color = Color(0.0, 0.0, 0.0, 0.78)
	overlay.size = vp
	pause_layer.add_child(overlay)

	var c := vp * 0.5

	var title := Label.new()
	title.text = "PAUSED"
	title.position = c - Vector2(140, 70)
	title.add_theme_font_size_override("font_size", 80)
	title.add_theme_color_override("font_color", Color(0.9, 0.9, 1.0))
	pause_layer.add_child(title)

	var hint_lines := ["ESC / P  —  Resume", "R  —  Restart game"]
	for i in hint_lines.size():
		var hl := Label.new()
		hl.text = hint_lines[i]
		hl.position = c - Vector2(110, -28 + i * 34)
		hl.add_theme_font_size_override("font_size", 22)
		hl.add_theme_color_override("font_color", Color(0.55, 0.55, 0.65))
		pause_layer.add_child(hl)

func _start() -> void:
	score = 0
	combo = 0
	max_combo = 0
	lives = 3
	level = 1
	spawn_interval = 1.8
	spawn_timer = 0.0
	active = true
	paused = false
	get_tree().paused = false
	pause_layer.visible = false

	for c in target_layer.get_children():
		c.queue_free()
	_refresh_hud()

func _process(delta: float) -> void:
	if not active or paused:
		return

	spawn_timer += delta
	if spawn_timer >= spawn_interval:
		spawn_timer = 0.0
		_spawn_target()
		spawn_interval = maxf(0.32, spawn_interval - 0.009)

	# Camera shake with decay
	if shake_timer > 0.0:
		shake_timer -= delta
		var s := shake_intensity * (shake_timer / maxf(0.001, shake_timer + delta))
		camera.offset = Vector2(randf_range(-s, s), randf_range(-s, s))
	else:
		camera.offset = camera.offset.lerp(Vector2.ZERO, 0.25)
		if camera.offset.length() < 0.5:
			camera.offset = Vector2.ZERO

func _spawn_target() -> void:
	var vp := get_viewport().get_visible_rect().size
	var margin := 95.0

	var target := Area2D.new()
	target.set_script(TARGET_SCRIPT)
	target_layer.add_child(target)

	target.position = Vector2(
		randf_range(margin, vp.x - margin),
		randf_range(margin + 20.0, vp.y - margin)
	)

	var r := randf_range(30.0, 68.0)
	var t := maxf(0.95, 2.9 - level * 0.075)
	target.setup(r, t)
	target.hit.connect(_on_target_hit)
	target.missed.connect(_on_target_missed)

func _on_target_hit(points: int, pos: Vector2) -> void:
	combo += 1
	if combo > max_combo:
		max_combo = combo

	var multiplier := 1 + combo / 8
	var total := points * multiplier
	score += total
	level = 1 + score / 1000

	_spawn_hit_particles(pos)
	_spawn_score_popup(total, pos, combo)
	_shake(2.5, 0.12)

	if combo > 0 and combo % 5 == 0:
		_show_combo_burst(combo, pos)

	_refresh_hud()
	_animate_combo()

func _on_target_missed() -> void:
	combo = 0
	lives -= 1
	_shake(16.0, 0.45)
	_flash_red()
	_refresh_hud()

	if lives <= 0:
		_end()

func _shake(intensity: float, duration: float) -> void:
	shake_intensity = maxf(shake_intensity, intensity)
	shake_timer = maxf(shake_timer, duration)

func _flash_red() -> void:
	var flash := ColorRect.new()
	flash.color = Color(1.0, 0.0, 0.0, 0.38)
	flash.size = get_viewport().get_visible_rect().size
	hud_layer.add_child(flash)
	var tw := create_tween()
	tw.tween_property(flash, "modulate:a", 0.0, 0.38)
	tw.tween_callback(flash.queue_free)

func _spawn_hit_particles(pos: Vector2) -> void:
	var p := CPUParticles2D.new()
	target_layer.add_child(p)
	p.position = pos
	p.emitting = true
	p.one_shot = true
	p.explosiveness = 0.92
	p.amount = 28
	p.lifetime = 0.75
	p.direction = Vector2(0.0, -1.0)
	p.spread = 180.0
	p.gravity = Vector2(0.0, 200.0)
	p.initial_velocity_min = 90.0
	p.initial_velocity_max = 240.0
	p.scale_amount_min = 3.0
	p.scale_amount_max = 7.0
	p.color = Color.from_hsv(randf(), 0.85, 1.0)
	var tw := create_tween()
	tw.tween_interval(1.5)
	tw.tween_callback(p.queue_free)

func _spawn_score_popup(points: int, pos: Vector2, c: int) -> void:
	var label := Label.new()
	label.text = "+" + str(points)
	if c > 1:
		label.text += "  ×" + str(1 + c / 8)
	label.position = pos - Vector2(22.0, 28.0)
	label.add_theme_font_size_override("font_size", 24 + mini(c * 2, 16))

	var col := Color.YELLOW
	if c >= 10:
		col = Color.from_hsv(0.85, 0.85, 1.0)
	elif c >= 5:
		col = Color.from_hsv(0.12, 0.9, 1.0)
	label.add_theme_color_override("font_color", col)

	target_layer.add_child(label)
	var tw := create_tween()
	tw.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_CUBIC)
	tw.tween_property(label, "position", pos - Vector2(22.0, 95.0), 0.75)
	tw.parallel().tween_property(label, "modulate:a", 0.0, 0.75)
	tw.tween_callback(label.queue_free)

func _show_combo_burst(c: int, pos: Vector2) -> void:
	var label := Label.new()
	label.text = str(c) + " COMBO!"
	label.position = pos - Vector2(70.0, 60.0)
	label.add_theme_font_size_override("font_size", 38)
	label.add_theme_color_override("font_color", Color(1.0, 0.6, 0.0))
	label.scale = Vector2(0.4, 0.4)
	target_layer.add_child(label)

	var tw := create_tween()
	tw.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_ELASTIC)
	tw.tween_property(label, "scale", Vector2.ONE, 0.3)
	tw.tween_interval(0.5)
	tw.tween_property(label, "modulate:a", 0.0, 0.4)
	tw.tween_callback(label.queue_free)

func _animate_combo() -> void:
	if combo <= 1:
		return
	if combo_scale_tween and combo_scale_tween.is_running():
		combo_scale_tween.kill()
	combo_scale_tween = create_tween()
	combo_scale_tween.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_ELASTIC)
	combo_scale_tween.tween_property(combo_label, "scale", Vector2(1.35, 1.35), 0.08)
	combo_scale_tween.tween_property(combo_label, "scale", Vector2.ONE, 0.18)

func _refresh_hud() -> void:
	score_label.text = str(score)
	level_label.text = "LV " + str(level)

	combo_label.text = ""
	if combo > 1:
		combo_label.text = "×" + str(combo)

	var hearts := ""
	for i in range(3):
		hearts += "♥" if i < lives else "♡"
	lives_label.text = hearts

func _end() -> void:
	active = false
	get_tree().paused = false
	await get_tree().create_timer(0.6).timeout
	game_over.emit(score, max_combo)

func _input(event: InputEvent) -> void:
	if not active:
		return
	if event is InputEventKey and event.pressed and not event.echo:
		match event.keycode:
			KEY_ESCAPE, KEY_P:
				_toggle_pause()
			KEY_R:
				_start()

func _toggle_pause() -> void:
	paused = not paused
	get_tree().paused = paused
	pause_layer.visible = paused


# Inner class for background grid drawing
class _GridNode extends Node2D:
	var vp_size: Vector2 = Vector2(1280, 720)

	func _draw() -> void:
		var spacing := 80.0
		var col := Color(0.08, 0.05, 0.15, 0.45)
		var cols := int(vp_size.x / spacing) + 1
		var rows := int(vp_size.y / spacing) + 1
		for x in cols:
			draw_line(Vector2(x * spacing, 0.0), Vector2(x * spacing, vp_size.y), col, 1.0)
		for y in rows:
			draw_line(Vector2(0.0, y * spacing), Vector2(vp_size.x, y * spacing), col, 1.0)
