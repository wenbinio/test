extends Node2D

enum State { START, PLAYING, GAME_OVER }

const GAME_SCRIPT := preload("res://scripts/Game.gd")

var state: State = State.START
var game_node: Node2D = null
var last_score: int = 0
var last_max_combo: int = 0

var start_layer: CanvasLayer
var go_layer: CanvasLayer
var bg_layer: CanvasLayer

# Start screen refs
var best_label: Label
var start_hint: Label

# Game-over screen refs
var go_score_label: Label
var go_combo_label: Label
var go_rank_label: Label
var hs_container: VBoxContainer
var go_anim_tween: Tween

func _ready() -> void:
	_build_bg()
	_build_start_screen()
	_build_game_over_screen()
	_show_start()

func _build_bg() -> void:
	bg_layer = CanvasLayer.new()
	bg_layer.layer = 0
	add_child(bg_layer)
	var bg := ColorRect.new()
	bg.color = Color(0.04, 0.02, 0.08)
	bg.set_anchors_preset(Control.PRESET_FULL_RECT)
	var ctrl := Control.new()
	ctrl.set_anchors_preset(Control.PRESET_FULL_RECT)
	bg_layer.add_child(ctrl)
	ctrl.add_child(bg)

func _build_start_screen() -> void:
	start_layer = CanvasLayer.new()
	start_layer.layer = 10
	add_child(start_layer)

	var vp := get_viewport().get_visible_rect().size
	var cx := vp.x * 0.5

	# Decorative neon rings
	var rings := _RingNode.new()
	rings.vp_size = vp
	start_layer.add_child(rings)

	# Title
	var title := Label.new()
	title.text = "NEON GOON"
	title.position = Vector2(cx - 280, 110)
	title.add_theme_font_size_override("font_size", 96)
	title.add_theme_color_override("font_color", Color.CYAN)
	start_layer.add_child(title)

	# Glow effect on title - animate color
	var title_tween := create_tween().set_loops()
	title_tween.tween_property(title, "modulate", Color(0.5, 1.0, 1.0, 1.0), 1.2)
	title_tween.tween_property(title, "modulate", Color(1.0, 1.0, 1.0, 1.0), 1.2)

	# Tagline
	var sub := Label.new()
	sub.text = "tap the orbs · chain combos · survive"
	sub.position = Vector2(cx - 235, 224)
	sub.add_theme_font_size_override("font_size", 22)
	sub.add_theme_color_override("font_color", Color(0.55, 0.85, 1.0, 0.85))
	start_layer.add_child(sub)

	# Best score
	best_label = Label.new()
	best_label.position = Vector2(cx - 80, 272)
	best_label.add_theme_font_size_override("font_size", 18)
	best_label.add_theme_color_override("font_color", Color(0.9, 0.85, 0.3))
	start_layer.add_child(best_label)

	# Separator
	var sep_node := _SepNode.new()
	sep_node.position = Vector2(cx - 200, 320)
	sep_node.w = 400.0
	start_layer.add_child(sep_node)

	# How to play
	var howto := [
		"♥  You get 3 lives — don't let orbs expire",
		"★  Smaller orbs = more points",
		"⚡  Hit early for a timing bonus",
		"×  Chain hits to multiply your score",
	]
	for i in howto.size():
		var h := Label.new()
		h.text = howto[i]
		h.position = Vector2(cx - 200, 342 + i * 30)
		h.add_theme_font_size_override("font_size", 17)
		h.add_theme_color_override("font_color", Color(0.65, 0.65, 0.75))
		start_layer.add_child(h)

	# Click to start
	start_hint = Label.new()
	start_hint.text = "▶  CLICK / TAP TO START  ◀"
	start_hint.position = Vector2(cx - 200, 510)
	start_hint.add_theme_font_size_override("font_size", 30)
	start_hint.add_theme_color_override("font_color", Color.WHITE)
	start_layer.add_child(start_hint)

	# Pulsing blink
	var blink := create_tween().set_loops()
	blink.tween_property(start_hint, "modulate:a", 0.25, 0.7)
	blink.tween_property(start_hint, "modulate:a", 1.0, 0.7)

	# Controls
	var ctrl_hint := Label.new()
	ctrl_hint.text = "ESC / P = Pause     R = Restart during game"
	ctrl_hint.position = Vector2(cx - 220, 570)
	ctrl_hint.add_theme_font_size_override("font_size", 13)
	ctrl_hint.add_theme_color_override("font_color", Color(0.35, 0.35, 0.4))
	start_layer.add_child(ctrl_hint)

func _build_game_over_screen() -> void:
	go_layer = CanvasLayer.new()
	go_layer.layer = 30
	go_layer.visible = false
	add_child(go_layer)

	var vp := get_viewport().get_visible_rect().size
	var cx := vp.x * 0.5

	# Dark overlay
	var overlay := ColorRect.new()
	overlay.color = Color(0.0, 0.0, 0.0, 0.88)
	overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	var ctrl := Control.new()
	ctrl.set_anchors_preset(Control.PRESET_FULL_RECT)
	go_layer.add_child(ctrl)
	ctrl.add_child(overlay)

	# "GAME OVER" title
	var title := Label.new()
	title.text = "GAME OVER"
	title.position = Vector2(cx - 260, 55)
	title.add_theme_font_size_override("font_size", 82)
	title.add_theme_color_override("font_color", Color(1.0, 0.15, 0.25))
	go_layer.add_child(title)

	# Score
	go_score_label = Label.new()
	go_score_label.position = Vector2(cx - 160, 155)
	go_score_label.add_theme_font_size_override("font_size", 52)
	go_score_label.add_theme_color_override("font_color", Color.CYAN)
	go_layer.add_child(go_score_label)

	# Rank / new best label
	go_rank_label = Label.new()
	go_rank_label.position = Vector2(cx - 60, 218)
	go_rank_label.add_theme_font_size_override("font_size", 20)
	go_rank_label.add_theme_color_override("font_color", Color(1.0, 0.85, 0.0))
	go_layer.add_child(go_rank_label)

	# Max combo
	go_combo_label = Label.new()
	go_combo_label.position = Vector2(cx - 110, 248)
	go_combo_label.add_theme_font_size_override("font_size", 22)
	go_combo_label.add_theme_color_override("font_color", Color(0.9, 0.7, 0.0))
	go_layer.add_child(go_combo_label)

	# High score section
	var hs_title := Label.new()
	hs_title.text = "—  HIGH SCORES  —"
	hs_title.position = Vector2(cx - 130, 295)
	hs_title.add_theme_font_size_override("font_size", 18)
	hs_title.add_theme_color_override("font_color", Color(0.7, 0.5, 1.0))
	go_layer.add_child(hs_title)

	hs_container = VBoxContainer.new()
	hs_container.position = Vector2(cx - 140, 326)
	go_layer.add_child(hs_container)

	# Buttons
	var btn_restart := _make_button("RESTART  (R)", cx - 175, 545)
	btn_restart.pressed.connect(_on_restart)
	go_layer.add_child(btn_restart)

	var btn_menu := _make_button("MENU  (M)", cx + 20, 545)
	btn_menu.pressed.connect(_on_menu)
	go_layer.add_child(btn_menu)

func _make_button(text: String, x: float, y: float) -> Button:
	var btn := Button.new()
	btn.text = text
	btn.position = Vector2(x, y)
	btn.size = Vector2(150, 52)
	btn.add_theme_font_size_override("font_size", 18)
	return btn

func _show_start() -> void:
	state = State.START
	start_layer.visible = true
	go_layer.visible = false

	var top := ScoreManager.get_top_score()
	best_label.text = "BEST:  " + str(top) if top > 0 else ""

func _start_game() -> void:
	state = State.PLAYING
	start_layer.visible = false
	go_layer.visible = false

	if game_node and is_instance_valid(game_node):
		game_node.queue_free()

	game_node = Node2D.new()
	game_node.set_script(GAME_SCRIPT)
	add_child(game_node)
	game_node.game_over.connect(_on_game_over)

func _on_game_over(final_score: int, max_combo: int) -> void:
	last_score = final_score
	last_max_combo = max_combo
	var rank := ScoreManager.submit_score(final_score)
	state = State.GAME_OVER
	_show_game_over(final_score, max_combo, rank)

func _show_game_over(final_score: int, max_combo: int, rank: int) -> void:
	go_layer.visible = true

	go_score_label.text = str(final_score)
	go_combo_label.text = "MAX COMBO  ×" + str(max_combo)

	go_rank_label.text = ""
	if rank == 1:
		go_rank_label.text = "★  NEW BEST!  ★"
	elif rank <= 3:
		go_rank_label.text = "#" + str(rank) + " on the board"
	elif rank > 0:
		go_rank_label.text = "rank #" + str(rank)

	# Populate high score list
	for child in hs_container.get_children():
		child.queue_free()

	for i in mini(ScoreManager.scores.size(), 10):
		var entry: Dictionary = ScoreManager.scores[i]
		var is_current := (entry["score"] == final_score and i == rank - 1)

		var row := Label.new()
		row.text = ("► " if is_current else "   ") + str(i + 1) + ".   " + str(entry["score"])
		row.add_theme_font_size_override("font_size", 16)
		row.add_theme_color_override("font_color",
				Color(1.0, 0.85, 0.1) if is_current else Color(0.72, 0.72, 0.82))
		hs_container.add_child(row)

	# Entrance animation for title
	if go_anim_tween:
		go_anim_tween.kill()
	var title := go_layer.get_child(1)  # The GAME OVER label is index 1 (after ctrl)
	title.scale = Vector2(0.5, 0.5)
	go_anim_tween = create_tween()
	go_anim_tween.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_ELASTIC)
	go_anim_tween.tween_property(title, "scale", Vector2.ONE, 0.5)

func _on_restart() -> void:
	_start_game()

func _on_menu() -> void:
	if game_node and is_instance_valid(game_node):
		game_node.queue_free()
		game_node = null
	get_tree().paused = false
	_show_start()

func _input(event: InputEvent) -> void:
	match state:
		State.START:
			var clicked := false
			if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
				clicked = true
			elif event is InputEventScreenTouch and event.pressed:
				clicked = true
			elif event is InputEventKey and event.pressed and not event.echo:
				if event.keycode in [KEY_SPACE, KEY_ENTER, KEY_KP_ENTER]:
					clicked = true
			if clicked:
				get_viewport().set_input_as_handled()
				_start_game()

		State.GAME_OVER:
			if event is InputEventKey and event.pressed and not event.echo:
				match event.keycode:
					KEY_R:
						get_viewport().set_input_as_handled()
						_on_restart()
					KEY_M, KEY_ESCAPE:
						get_viewport().set_input_as_handled()
						_on_menu()


# Decorative animated rings for the start screen
class _RingNode extends Node2D:
	var vp_size: Vector2 = Vector2(1280, 720)
	var t: float = 0.0

	func _process(delta: float) -> void:
		t += delta
		queue_redraw()

	func _draw() -> void:
		var cx := vp_size.x * 0.5
		var cy := vp_size.y * 0.5
		var rings := [
			[cx, cy * 0.5, 260.0, 0.0, Color.CYAN],
			[cx, cy * 0.5, 200.0, 0.4, Color(0.8, 0.3, 1.0)],
			[cx, cy * 0.5, 140.0, 0.8, Color(0.0, 1.0, 0.6)],
		]
		for ring in rings:
			var center := Vector2(ring[0], ring[1])
			var r: float = ring[2]
			var phase: float = ring[3]
			var col: Color = ring[4]
			var progress := fmod(t * 0.25 + phase, 1.0)
			var arc_len := 0.65 + sin(t * 0.5 + phase) * 0.2
			var start := t * 1.2 + phase * 3.0
			draw_arc(center, r, start, start + TAU * arc_len, 80,
					 Color(col, 0.18 + sin(t + phase) * 0.06), 2.5)
			draw_arc(center, r + 8.0, start * 0.7, start * 0.7 + TAU * (1.0 - arc_len * 0.4), 60,
					 Color(col, 0.07), 1.5)


# Simple horizontal separator line
class _SepNode extends Node2D:
	var w: float = 400.0

	func _draw() -> void:
		draw_line(Vector2.ZERO, Vector2(w, 0.0), Color(0.25, 0.25, 0.35, 0.7), 1.0)
