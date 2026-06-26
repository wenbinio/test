//! Chapter 03 — Functions
//! Run: cargo run --example 03_functions
//!
//! Topics: fn, parameters, return values, expressions vs statements,
//!         functions as values, higher-order functions

fn main() {
    greet("Alice");

    let sum = add(3, 5);
    println!("3 + 5 = {sum}");

    // Expressions vs statements:
    // - A *statement* performs an action and returns ().
    // - An *expression* evaluates to a value.
    // The block below is an expression that evaluates to 4.
    let y = {
        let x = 3;
        x + 1   // no semicolon → this line is the expression value
    };
    println!("y = {y}");  // 4

    // Functions can be assigned to variables (fn pointers).
    let f = add;
    println!("f(2, 3) = {}", f(2, 3));

    // Higher-order: pass a function as an argument.
    println!("apply(double, 5) = {}", apply(double, 5));
    println!("apply(square, 4) = {}", apply(square, 4));

    // Early returns with `return`.
    println!("safe_div(10, 2) = {:?}", safe_div(10, 2));
    println!("safe_div(10, 0) = {:?}", safe_div(10, 0));

    // Nested functions are allowed.
    fn cube(n: i32) -> i32 {
        n * n * n
    }
    println!("cube(3) = {}", cube(3));
}

// ── Function definitions ──────────────────────────────────────────────────────
//
// Syntax: fn name(param: Type, ...) -> ReturnType { body }
// Parameters *must* have type annotations.
// The last expression (without `;`) is the return value.

fn greet(name: &str) {
    println!("Hello, {name}!");
    // Implicit return type is () (unit).
}

fn add(x: i32, y: i32) -> i32 {
    x + y   // implicit return
}

fn double(x: i32) -> i32 { x * 2 }
fn square(x: i32) -> i32 { x * x }

// Function pointer type: fn(i32) -> i32
fn apply(f: fn(i32) -> i32, x: i32) -> i32 {
    f(x)
}

// `return` keyword for early exit.
fn safe_div(x: i32, y: i32) -> Option<i32> {
    if y == 0 {
        return None;  // early return
    }
    Some(x / y)   // implicit return
}
