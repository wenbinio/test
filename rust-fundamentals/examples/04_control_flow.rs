//! Chapter 04 — Control Flow
//! Run: cargo run --example 04_control_flow
//!
//! Topics: if/else, loop, while, for, match, if let, while let

fn main() {
    // ── if / else if / else ───────────────────────────────────────────────────
    let number = 7;

    if number < 0 {
        println!("negative");
    } else if number == 0 {
        println!("zero");
    } else {
        println!("positive");
    }

    // `if` is an expression — it returns a value.
    let description = if number % 2 == 0 { "even" } else { "odd" };
    println!("{number} is {description}");

    // ── loop ─────────────────────────────────────────────────────────────────
    // `loop` runs forever until `break`.
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 5 {
            break counter * 2;  // break can return a value
        }
    };
    println!("loop result = {result}");  // 10

    // Loop labels let you break/continue outer loops.
    'outer: for i in 0..5 {
        for j in 0..5 {
            if i + j > 5 {
                break 'outer;
            }
            print!("({i},{j}) ");
        }
    }
    println!();

    // ── while ────────────────────────────────────────────────────────────────
    let mut n = 3;
    while n > 0 {
        println!("while: {n}");
        n -= 1;
    }

    // ── for ──────────────────────────────────────────────────────────────────
    // Iterate over a range:
    for i in 0..5 {        // 0, 1, 2, 3, 4  (exclusive end)
        print!("{i} ");
    }
    println!();

    for i in 0..=5 {       // 0, 1, 2, 3, 4, 5  (inclusive end)
        print!("{i} ");
    }
    println!();

    // Iterate over a collection:
    let fruits = ["apple", "banana", "cherry"];
    for fruit in &fruits {
        println!("fruit: {fruit}");
    }

    // enumerate() gives (index, value) pairs:
    for (i, fruit) in fruits.iter().enumerate() {
        println!("{i}: {fruit}");
    }

    // ── match ────────────────────────────────────────────────────────────────
    // match is exhaustive — every possible value must be covered.
    let coin = 25u32;
    let name = match coin {
        1  => "penny",
        5  => "nickel",
        10 => "dime",
        25 => "quarter",
        _  => "unknown",  // `_` is the catch-all pattern
    };
    println!("coin: {name}");

    // match is also an expression:
    let score = 85u32;
    let grade = match score {
        90..=100 => "A",
        80..=89  => "B",
        70..=79  => "C",
        60..=69  => "D",
        _        => "F",
    };
    println!("grade: {grade}");

    // Match guards add extra conditions to a pattern.
    let pair = (2, -3);
    match pair {
        (x, y) if x > 0 && y > 0 => println!("both positive"),
        (x, y) if x < 0 && y < 0 => println!("both negative"),
        (0, _) | (_, 0)           => println!("one is zero"),
        _                          => println!("mixed signs"),
    }

    // Binding with `@` captures a value while also testing it.
    let num = 7;
    match num {
        n @ 1..=12 => println!("{n} is a month number"),
        n @ 13..   => println!("{n} is larger than 12"),
        _           => println!("something else"),
    }

    // ── if let ───────────────────────────────────────────────────────────────
    // Concise alternative to match when you only care about one pattern.
    let some_value: Option<i32> = Some(42);

    if let Some(v) = some_value {
        println!("Got value: {v}");
    } else {
        println!("Nothing");
    }

    // ── while let ────────────────────────────────────────────────────────────
    // Loop as long as a pattern matches.
    let mut stack = vec![1, 2, 3];
    while let Some(top) = stack.pop() {
        println!("popped: {top}");
    }
}
