//! Chapter 06 — Borrowing & References
//! Run: cargo run --example 06_borrowing
//!
//! Borrowing lets you use a value without taking ownership.
//!
//! The borrowing rules (enforced at compile time):
//!   1. At any given time, you can have EITHER:
//!        - any number of shared (immutable) references  (&T), OR
//!        - exactly ONE mutable reference               (&mut T)
//!   2. References must always be valid (no dangling references).

fn main() {
    // ── Shared References (&T) ────────────────────────────────────────────────
    //
    // `&s` creates a reference to s. The reference *borrows* s without
    // taking ownership. When the reference goes out of scope, the value
    // is NOT dropped — the original owner still holds it.

    let s = String::from("hello");
    let len = calculate_length(&s);  // lend s to the function
    println!("{s} has {len} chars"); // s still valid here!

    // Multiple shared references are fine.
    let r1 = &s;
    let r2 = &s;
    println!("r1={r1}, r2={r2}");

    // ── Mutable References (&mut T) ───────────────────────────────────────────
    //
    // You need `mut` on both the variable AND the reference.
    // Only ONE mutable reference to a value is allowed in a scope.

    let mut s2 = String::from("hello");
    change(&mut s2);
    println!("s2 after change: {s2}");

    // This would be a compile error — two mutable refs in the same scope:
    // let r1 = &mut s2;
    // let r2 = &mut s2;  // ERROR

    // You CAN have sequential mutable borrows (non-overlapping lifetimes):
    {
        let _r1 = &mut s2;
    }  // _r1 dropped here
    let _r2 = &mut s2;  // OK — _r1 is gone

    // Shared and mutable refs cannot coexist:
    // let r_shared = &s2;
    // let r_mut    = &mut s2;  // ERROR while r_shared is still live

    // ── Slices ────────────────────────────────────────────────────────────────
    //
    // A slice is a reference to a contiguous portion of a collection.
    // Type: &[T] for arrays/vecs, &str for Strings.

    // String slices:
    let text = String::from("hello world");
    let hello = &text[0..5];   // &str pointing into text
    let world = &text[6..11];
    println!("{hello} {world}");

    // A string literal *is* a &str — a slice pointing into binary data.
    let literal: &str = "I am a &str";
    println!("{literal}");

    // Prefer &str over &String for function parameters — more flexible.
    println!("first word: '{}'", first_word(&text));
    println!("first word: '{}'", first_word("static string"));

    // Array slices:
    let arr = [10, 20, 30, 40, 50];
    let slice: &[i32] = &arr[1..4];  // [20, 30, 40]
    println!("slice: {:?}", slice);
    println!("slice sum: {}", slice.iter().sum::<i32>());

    // ── Dangling References (prevented by compiler) ────────────────────────────
    //
    // The following would be illegal — the compiler won't let you create a
    // reference that outlives the data it points to:
    //
    // fn dangle() -> &String {
    //     let s = String::from("hello"); // s created
    //     &s                             // reference to s returned
    // }  // s dropped here! Dangling reference — compile error.

    println!("Borrowing chapter complete!");
}

// Takes a *shared reference* — borrows the String without ownership.
fn calculate_length(s: &String) -> usize {
    s.len()
}  // s goes out of scope but the String is NOT dropped — we don't own it.

// Takes a *mutable reference* — can modify the borrowed value.
fn change(s: &mut String) {
    s.push_str(", world");
}

// &str accepts both &String (via auto-deref) and string literals.
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &byte) in bytes.iter().enumerate() {
        if byte == b' ' {
            return &s[..i];
        }
    }
    s  // whole string is one word
}
