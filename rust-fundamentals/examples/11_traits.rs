//! Chapter 11 — Traits
//! Run: cargo run --example 11_traits
//!
//! Topics: defining traits, implementing traits, default methods,
//!         trait bounds, impl Trait, operator overloading, Display

use std::fmt;
use std::ops::Add;

// ── Defining a Trait ──────────────────────────────────────────────────────────
// A trait declares a set of methods a type must implement.
trait Animal {
    // Required method — implementors must define this.
    fn name(&self) -> &str;
    fn sound(&self) -> &str;

    // Default method — implementors may override this.
    fn description(&self) -> String {
        format!("{} says '{}'", self.name(), self.sound())
    }
}

// ── Implementing Traits ───────────────────────────────────────────────────────
struct Dog {
    name: String,
}

struct Cat {
    name: String,
}

impl Animal for Dog {
    fn name(&self) -> &str  { &self.name }
    fn sound(&self) -> &str { "woof" }
    // Uses the default description()
}

impl Animal for Cat {
    fn name(&self) -> &str  { &self.name }
    fn sound(&self) -> &str { "meow" }
    // Overrides the default:
    fn description(&self) -> String {
        format!("The aloof {} says '{}'", self.name(), self.sound())
    }
}

// ── Trait Bounds ──────────────────────────────────────────────────────────────
// Restrict a generic parameter to types that implement certain traits.

// `impl Trait` syntax (shorthand for simple cases):
fn print_animal(a: &impl Animal) {
    println!("{}", a.description());
}

// Equivalent with explicit generic and trait bound:
fn print_animal_generic<T: Animal>(a: &T) {
    println!("{}", a.description());
}

// `where` clause — cleaner for complex bounds:
fn compare_animals<T, U>(a: &T, b: &U)
where
    T: Animal + fmt::Debug,
    U: Animal + fmt::Debug,
{
    println!("Comparing: {:?} vs {:?}", a, b);
}

// Return a trait object with `impl Trait` (static dispatch, one concrete type):
fn loudest_animal(loud: bool) -> impl Animal {
    if loud {
        Dog { name: String::from("Rex") }
    } else {
        Dog { name: String::from("Buddy") }
    }
}

// ── Trait Objects (dynamic dispatch) ─────────────────────────────────────────
// `dyn Trait` lets you store different types behind a pointer at runtime.
fn make_animal(species: &str) -> Box<dyn Animal> {
    match species {
        "dog" => Box::new(Dog { name: String::from("Buddy") }),
        _     => Box::new(Cat { name: String::from("Whiskers") }),
    }
}

// ── Standard Library Traits ───────────────────────────────────────────────────

// fmt::Display — controls how a type prints with `{}`
#[derive(Debug)]
struct Point {
    x: f64,
    y: f64,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

// std::ops::Add — overloads the `+` operator
impl Add for Point {
    type Output = Point;
    fn add(self, other: Point) -> Point {
        Point { x: self.x + other.x, y: self.y + other.y }
    }
}

// PartialEq — overloads `==`
impl PartialEq for Point {
    fn eq(&self, other: &Self) -> bool {
        (self.x - other.x).abs() < 1e-10 && (self.y - other.y).abs() < 1e-10
    }
}

// ── Trait for Debug printing ──────────────────────────────────────────────────
#[derive(Debug)]
struct Dog2(String);

impl fmt::Debug for Dog {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Dog({})", self.name)
    }
}

impl fmt::Debug for Cat {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Cat({})", self.name)
    }
}

fn main() {
    let dog = Dog { name: String::from("Rex") };
    let cat = Cat { name: String::from("Luna") };

    print_animal(&dog);
    print_animal(&cat);
    print_animal_generic(&dog);

    compare_animals(&dog, &cat);

    let loud = loudest_animal(true);
    println!("loudest: {}", loud.description());

    // Dynamic dispatch with trait objects:
    let animals: Vec<Box<dyn Animal>> = vec![
        make_animal("dog"),
        make_animal("cat"),
        make_animal("fish"),  // falls through to cat branch
    ];
    for a in &animals {
        println!("{}", a.description());
    }

    // Display and operator overloading:
    let p1 = Point { x: 1.0, y: 2.0 };
    let p2 = Point { x: 3.0, y: 4.0 };
    println!("p1 = {p1}");           // uses Display
    println!("p2 = {p2:?}");         // uses Debug
    println!("p1 + p2 = {}", p1 + p2);
    let p3 = Point { x: 1.0, y: 2.0 };
    println!("p1 == p3: {}", Point { x: 1.0, y: 2.0 } == p3);
}
