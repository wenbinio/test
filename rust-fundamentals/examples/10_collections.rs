//! Chapter 10 — Collections
//! Run: cargo run --example 10_collections
//!
//! Topics: Vec<T>, String, HashMap<K,V>

use std::collections::HashMap;

fn main() {
    vectors();
    strings();
    hash_maps();
}

fn vectors() {
    println!("\n── Vec<T> ──");

    // Creating vectors
    let empty: Vec<i32> = Vec::new();
    let v1 = vec![1, 2, 3, 4, 5];    // vec! macro
    let v2: Vec<i32> = (1..=5).collect();
    println!("empty: {:?}", empty);
    println!("v1:    {:?}", v1);
    println!("v2:    {:?}", v2);

    // Modifying
    let mut v = Vec::new();
    v.push(10);
    v.push(20);
    v.push(30);
    println!("after push: {:?}", v);
    let popped = v.pop();
    println!("popped: {:?}, v: {:?}", popped, v);

    v.insert(1, 15);   // insert 15 at index 1
    v.remove(0);       // remove element at index 0
    println!("after insert/remove: {:?}", v);

    // Accessing elements
    let third = &v1[2];              // panics if out of bounds
    let safe  = v1.get(2);          // returns Option<&T>
    let oob   = v1.get(100);        // None, no panic
    println!("third={third}, safe={:?}, oob={:?}", safe, oob);

    // Iterating
    for x in &v1 {
        print!("{x} ");
    }
    println!();

    // Mutating while iterating
    let mut mutable = vec![1, 2, 3];
    for x in &mut mutable {
        *x *= 10;   // dereference to mutate
    }
    println!("mutable: {:?}", mutable);

    // Common operations
    let sum: i32   = v1.iter().sum();
    let max        = v1.iter().max();
    let sorted = { let mut s = v1.clone(); s.sort(); s };
    let deduped = { let mut d = vec![1,1,2,2,3]; d.dedup(); d };
    println!("sum={sum}, max={:?}", max);
    println!("sorted: {:?}", sorted);
    println!("deduped: {:?}", deduped);

    // Vec of enums lets you store mixed types:
    #[derive(Debug)]
    enum Cell { Int(i32), Float(f64), Text(String) }
    let row = vec![
        Cell::Int(1),
        Cell::Float(3.14),
        Cell::Text(String::from("hello")),
    ];
    println!("row: {:?}", row);
}

fn strings() {
    println!("\n── String ──");
    // String vs &str:
    //   String  — owned, heap-allocated, growable
    //   &str    — borrowed reference to string data (often a slice)

    let s1 = String::new();
    let s2 = String::from("hello");
    let s3 = "world".to_string();
    println!("s1='{}', s2='{}', s3='{}'", s1, s2, s3);

    // Growing a String
    let mut s = String::from("Hello");
    s.push_str(", world");   // push a &str
    s.push('!');              // push a single char
    println!("{s}");

    // Concatenation with `+`: the left-hand side is consumed (moved).
    let s4 = String::from("Hello, ");
    let s5 = String::from("world!");
    let s6 = s4 + &s5;   // s4 is moved here
    println!("{s6}");
    // s4 is no longer valid

    // For multiple strings, format! is cleaner (doesn't take ownership).
    let a = String::from("tic");
    let b = String::from("tac");
    let c = String::from("toe");
    let result = format!("{a}-{b}-{c}");
    println!("{result}");
    // a, b, c are still valid

    // Slicing — be careful to slice on char boundaries!
    let hello = "Здравствуйте";  // Russian
    let first_two_chars = &hello[0..4];  // each Cyrillic char is 2 bytes
    println!("first two chars: {first_two_chars}");

    // Iterating over chars (correct) vs bytes
    let word = "hello";
    let char_count = word.chars().count();
    let byte_count = word.len();
    println!("chars={char_count}, bytes={byte_count}");
    for ch in "hi".chars() {
        print!("{ch} ");
    }
    println!();

    // Common methods
    let text = "  Hello, World!  ";
    println!("trimmed: '{}'", text.trim());
    println!("upper:   '{}'", text.trim().to_uppercase());
    println!("lower:   '{}'", text.trim().to_lowercase());
    println!("contains 'World': {}", text.contains("World"));
    println!("replace: '{}'", text.trim().replace("World", "Rust"));
    let parts: Vec<&str> = "a,b,c".split(',').collect();
    println!("split: {:?}", parts);
}

fn hash_maps() {
    println!("\n── HashMap<K,V> ──");

    // Creating
    let mut scores: HashMap<String, i32> = HashMap::new();

    // Inserting
    scores.insert(String::from("Alice"), 95);
    scores.insert(String::from("Bob"),   87);
    scores.insert(String::from("Carol"), 92);
    println!("{:?}", scores);

    // Building from iterators
    let names  = vec!["Dave", "Eve"];
    let points = vec![78, 88];
    let map2: HashMap<_, _> = names.into_iter().zip(points.into_iter()).collect();
    println!("{:?}", map2);

    // Accessing values
    let alice_score = scores.get("Alice");           // Option<&i32>
    println!("Alice: {:?}", alice_score);
    println!("Alice: {}", scores["Alice"]);          // panics if key missing
    println!("Unknown: {}", scores.get("Unknown").unwrap_or(&0));

    // Checking for a key
    println!("has Bob: {}", scores.contains_key("Bob"));

    // Overwriting
    scores.insert(String::from("Bob"), 90);
    println!("Bob updated: {:?}", scores.get("Bob"));

    // Insert only if absent (entry API)
    scores.entry(String::from("Dave")).or_insert(75);
    scores.entry(String::from("Alice")).or_insert(0);  // no-op; Alice exists
    println!("after entry: {:?}", scores.get("Dave"));
    println!("Alice unchanged: {:?}", scores.get("Alice"));

    // Updating based on old value
    let text = "hello world hello rust hello";
    let mut word_count: HashMap<&str, u32> = HashMap::new();
    for word in text.split_whitespace() {
        let count = word_count.entry(word).or_insert(0);
        *count += 1;
    }
    println!("word counts: {:?}", word_count);

    // Iterating
    for (key, val) in &scores {
        println!("  {key}: {val}");
    }

    // Removing
    scores.remove("Carol");
    println!("after remove: {:?}", scores);
}
