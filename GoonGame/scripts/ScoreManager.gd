extends Node

const SAVE_PATH := "user://highscores.save"
const MAX_ENTRIES := 10

var scores: Array = []

func _ready() -> void:
	_load()

func submit_score(value: int) -> int:
	if value <= 0:
		return -1
	scores.append({"score": value})
	scores.sort_custom(func(a, b): return a["score"] > b["score"])
	if scores.size() > MAX_ENTRIES:
		scores.resize(MAX_ENTRIES)
	_save()
	for i in scores.size():
		if scores[i]["score"] == value:
			return i + 1
	return scores.size()

func get_top_score() -> int:
	if scores.is_empty():
		return 0
	return scores[0]["score"]

func is_new_best(value: int) -> bool:
	return scores.is_empty() or value > scores[0]["score"]

func _save() -> void:
	var file := FileAccess.open(SAVE_PATH, FileAccess.WRITE)
	if file:
		file.store_var(scores)

func _load() -> void:
	if not FileAccess.file_exists(SAVE_PATH):
		return
	var file := FileAccess.open(SAVE_PATH, FileAccess.READ)
	if file:
		var data = file.get_var()
		if data is Array:
			scores = data
