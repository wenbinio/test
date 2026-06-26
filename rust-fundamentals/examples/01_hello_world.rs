//! Chapter 01 — Hello, World!
//! Run: cargo run --example 01_hello_world
//!
//! Topics: println! macro, format strings, debug printing

fn main() {
    // println! is a *macro* (note the `!`). Macros are code that writes code.
    println!("Hello, World!");

    // `{}` is a format placeholder — the value is converted via Display.
    let name = "Rustacean";
    println!("Hello, {}!", name);

    // Multiple placeholders are filled left-to-right.
    let x = 5;
    let y = 10;
    println!("{} + {} = {}", x, y, x + y);

    // Named arguments (Rust 2021+)
    println!("{name} loves Rust!");

    // {:?} uses the Debug trait — great for inspecting values.
    let numbers = [1, 2, 3, 4, 5];
    println!("Debug:  {:?}", numbers);

    // {:#?} pretty-prints with indentation.
    println!("Pretty: {:#?}", numbers);

    // Padding and alignment
    println!("{:>10}", "right");   // right-aligned in 10 chars
    println!("{:<10}", "left");    // left-aligned
    println!("{:^10}", "center");  // centered
    println!("{:0>5}", 42);        // zero-padded: 00042

    // eprintln! writes to stderr — useful for diagnostics.
    eprintln!("This goes to stderr.");
}
