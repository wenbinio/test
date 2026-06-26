//! Chapter 07 — Structs
//! Run: cargo run --example 07_structs
//!
//! Topics: struct, impl, methods, associated functions, derive macros

// ── Defining a Struct ─────────────────────────────────────────────────────────
//
// `derive` automatically implements common traits.
#[derive(Debug, Clone)]
struct User {
    username: String,
    email: String,
    active: bool,
    login_count: u32,
}

// ── Tuple Structs ─────────────────────────────────────────────────────────────
// Named tuples — useful when you want a distinct type but don't need field names.
#[derive(Debug)]
struct Point(f64, f64);

#[derive(Debug)]
struct Color(u8, u8, u8);

// ── Unit-Like Struct ──────────────────────────────────────────────────────────
// No fields. Useful for implementing traits on a type with no data.
struct AlwaysTrue;

// ── Methods and Associated Functions ─────────────────────────────────────────
#[derive(Debug, Clone)]
struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    // Associated function (no `self`): called as Rectangle::new(...).
    // Convention: `new` creates an instance.
    pub fn new(width: f64, height: f64) -> Rectangle {
        Rectangle { width, height }  // field init shorthand when name == variable
    }

    pub fn square(size: f64) -> Rectangle {
        Rectangle { width: size, height: size }
    }

    // Method: first parameter is `&self` (shared borrow of the instance).
    pub fn area(&self) -> f64 {
        self.width * self.height
    }

    pub fn perimeter(&self) -> f64 {
        2.0 * (self.width + self.height)
    }

    pub fn is_square(&self) -> bool {
        (self.width - self.height).abs() < f64::EPSILON
    }

    // &mut self: method can mutate the struct.
    pub fn scale(&mut self, factor: f64) {
        self.width  *= factor;
        self.height *= factor;
    }

    // self (no &): consumes the instance (moves it).
    pub fn into_tuple(self) -> (f64, f64) {
        (self.width, self.height)
    }

    // Methods can take other instances as parameters.
    pub fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

// Multiple `impl` blocks are allowed (useful with generics/traits).
impl Rectangle {
    pub fn describe(&self) {
        println!("Rectangle {}x{} (area={})", self.width, self.height, self.area());
    }
}

fn main() {
    // ── Creating Struct Instances ─────────────────────────────────────────────
    let user1 = User {
        username: String::from("alice"),
        email: String::from("alice@example.com"),
        active: true,
        login_count: 1,
    };
    println!("user: {} ({})", user1.username, user1.email);

    // Struct update syntax: copy remaining fields from another instance.
    let user2 = User {
        username: String::from("bob"),
        email: String::from("bob@example.com"),
        ..user1   // active and login_count copied from user1
    };
    println!("user2: {}, active={}", user2.username, user2.active);
    // Note: user1.active and user1.login_count are Copy, so user1 is still usable.

    // ── Tuple Structs ──────────────────────────────────────────────────────────
    let origin = Point(0.0, 0.0);
    let red = Color(255, 0, 0);
    println!("origin: {:?}", origin);
    println!("red: ({}, {}, {})", red.0, red.1, red.2);

    // ── Using Rectangle ───────────────────────────────────────────────────────
    let rect = Rectangle::new(10.0, 5.0);
    rect.describe();
    println!("area       = {}", rect.area());
    println!("perimeter  = {}", rect.perimeter());
    println!("is_square  = {}", rect.is_square());

    let sq = Rectangle::square(4.0);
    println!("sq is_square = {}", sq.is_square());
    println!("rect can hold sq? {}", rect.can_hold(&sq));

    let mut mutable_rect = rect.clone();
    mutable_rect.scale(2.0);
    mutable_rect.describe();

    let (w, h) = mutable_rect.into_tuple();
    println!("tuple: ({w}, {h})");
    // mutable_rect is no longer accessible here — it was consumed by into_tuple.

    // ── Debug printing ────────────────────────────────────────────────────────
    println!("{:?}", sq);
    println!("{:#?}", Rectangle::new(3.0, 7.0));
}
