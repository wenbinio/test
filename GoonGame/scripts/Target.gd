extends Area2D

signal hit(points: int, pos: Vector2)
signal missed

var radius: float = 50.0
var time_limit: float = 2.5
var elapsed: float = 0.0
var alive: bool = true
var base_points: int = 100
var ring_progress: float = 1.0
var primary_hue: float = 0.5
var pulse_offset: float = 0.0

func setup(r: float, t: float) -> void:
	radius = r
	time_limit = t
	base_points = int(120.0 * (60.0 / r))
	primary_hue = randf()
	pulse_offset = randf() * TAU

	var collision := CollisionShape2D.new()
	var shape := CircleShape2D.new()
	shape.radius = r
	collision.shape = shape
	add_child(collision)
	input_pickable = true

	# Appear pop animation
	scale = Vector2.ZERO
	var tw := create_tween()
	tw.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_ELASTIC)
	tw.tween_property(self, "scale", Vector2.ONE, 0.35)

func _process(delta: float) -> void:
	if not alive:
		return
	elapsed += delta
	ring_progress = 1.0 - clampf(elapsed / time_limit, 0.0, 1.0)
	queue_redraw()
	if ring_progress <= 0.0:
		_miss()

func _draw() -> void:
	var r := radius
	var pulse := sin(elapsed * 9.0 + pulse_offset) * 2.0

	# Danger factor shifts color toward red
	var danger := 1.0 - ring_progress
	var hue := lerpf(primary_hue, 0.0, danger * 0.7)
	var col := Color.from_hsv(hue, 0.85, 1.0)

	# Outer glow layers
	for i in range(5):
		var alpha := 0.09 - i * 0.014
		draw_arc(Vector2.ZERO, r + (i + 1) * 4.0 + pulse,
				 0.0, TAU, 48, Color(col.r, col.g, col.b, alpha), 3.5)

	# Dark fill
	draw_circle(Vector2.ZERO, r, Color(0.04, 0.02, 0.08, 0.9))

	# Timer ring (progress arc, counter-clockwise)
	if ring_progress > 0.001:
		var end_angle := -PI / 2.0 + TAU * ring_progress
		draw_arc(Vector2.ZERO, r - 5.0, -PI / 2.0, end_angle, 72, col, 6.0)

	# Static border
	draw_arc(Vector2.ZERO, r, 0.0, TAU, 64, Color(col, 0.2), 1.5)

	# Inner glow dot
	var inner_r := r * 0.22 + pulse * 0.25
	draw_circle(Vector2.ZERO, inner_r, Color(1, 1, 1, 0.95))
	draw_arc(Vector2.ZERO, inner_r + 3.0, 0.0, TAU, 32, Color(col, 0.6), 2.0)

func _input_event(_viewport: Node, event: InputEvent, _shape_idx: int) -> void:
	if not alive:
		return
	var pressed := false
	if event is InputEventMouseButton:
		pressed = event.pressed and event.button_index == MOUSE_BUTTON_LEFT
	elif event is InputEventScreenTouch:
		pressed = event.pressed
	if pressed:
		_hit()

func _hit() -> void:
	alive = false
	set_process(false)
	var bonus := int(ring_progress * 60.0)
	hit.emit(base_points + bonus, global_position)

	var tw := create_tween()
	tw.set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_CUBIC)
	tw.tween_property(self, "scale", Vector2(2.8, 2.8), 0.18)
	tw.parallel().tween_property(self, "modulate:a", 0.0, 0.18)
	tw.tween_callback(queue_free)

func _miss() -> void:
	alive = false
	set_process(false)
	missed.emit()

	var tw := create_tween()
	tw.tween_property(self, "modulate", Color(1.0, 0.15, 0.15, 0.0), 0.22)
	tw.tween_callback(queue_free)
