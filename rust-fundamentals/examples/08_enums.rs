//! Chapter 08 — Enums & Pattern Matching
//! Run: cargo run --example 08_enums
//!
//! Topics: enum, enum with data, Option<T>, match, if let

// ── Simple Enum ───────────────────────────────────────────────────────────────
#[derive(Debug)]
enum Direction {
    North,
    South,
    East,
    West,
}

// ── Enum With Data ────────────────────────────────────────────────────────────
// Each variant can hold different types and amounts of data.
#[derive(Debug)]
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
    Triangle(f64, f64, f64),  // sides a, b, c
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle { radius }         => std::f64::consts::PI * radius * radius,
            Shape::Rectangle { width, height } => width * height,
            Shape::Triangle(a, b, c) => {
                // Heron's formula
                let s = (a + b + c) / 2.0;
                (s * (s - a) * (s - b) * (s - c)).sqrt()
            }
        }
    }

    fn describe(&self) {
        println!("{:?} → area = {:.2}", self, self.area());
    }
}

// ── Message Enum (like a discriminated union) ──────────────────────────────────
#[derive(Debug)]
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

impl Message {
    fn process(&self) {
        match self {
            Message::Quit              => println!("Quit!"),
            Message::Move { x, y }    => println!("Move to ({x},{y})"),
            Message::Write(text)       => println!("Write: {text}"),
            Message::ChangeColor(r, g, b) => println!("Color: rgb({r},{g},{b})"),
        }
    }
}

fn main() {
    // ── Simple Enum ───────────────────────────────────────────────────────────
    let dir = Direction::North;
    match dir {
        Direction::North => println!("Going north"),
        Direction::South => println!("Going south"),
        Direction::East  => println!("Going east"),
        Direction::West  => println!("Going west"),
    }

    // ── Enum With Data ────────────────────────────────────────────────────────
    let shapes = vec![
        Shape::Circle { radius: 5.0 },
        Shape::Rectangle { width: 4.0, height: 6.0 },
        Shape::Triangle(3.0, 4.0, 5.0),
    ];
    for shape in &shapes {
        shape.describe();
    }

    // ── Messages ──────────────────────────────────────────────────────────────
    let messages = vec![
        Message::Quit,
        Message::Move { x: 10, y: 20 },
        Message::Write(String::from("hello")),
        Message::ChangeColor(255, 128, 0),
    ];
    for msg in &messages {
        msg.process();
    }

    // ── Option<T> ─────────────────────────────────────────────────────────────
    // Rust has no null. Instead, use Option<T>:
    //   enum Option<T> { Some(T), None }
    // The compiler forces you to handle both cases.

    let some_number: Option<i32> = Some(42);
    let no_number:   Option<i32> = None;

    // match is the exhaustive way to handle Option:
    match some_number {
        Some(n) => println!("Got: {n}"),
        None    => println!("Nothing"),
    }

    // Handy Option methods:
    println!("{}", some_number.unwrap_or(0));       // 42
    println!("{}", no_number.unwrap_or(0));         // 0
    println!("{}", some_number.unwrap_or_default()); // 42
    println!("{:?}", some_number.map(|n| n * 2));    // Some(84)
    println!("{:?}", some_number.filter(|&n| n > 50)); // None

    let doubled = some_number
        .filter(|&n| n > 0)
        .map(|n| n * 2);
    println!("doubled: {:?}", doubled);

    // if let — concise when only one pattern matters:
    if let Some(v) = some_number {
        println!("Value is {v}");
    }

    // ── Nested Pattern Matching ───────────────────────────────────────────────
    let pair = (true, 42);
    match pair {
        (true,  n) if n > 0 => println!("true and positive: {n}"),
        (true,  _)          => println!("true but not positive"),
        (false, _)          => println!("false"),
    }

    // ── Destructuring in let ──────────────────────────────────────────────────
    let msg = Message::Move { x: 5, y: 10 };
    if let Message::Move { x, y } = msg {
        println!("x={x}, y={y}");
    }
}
