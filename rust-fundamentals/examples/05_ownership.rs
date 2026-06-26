//! Chapter 05 — Ownership
//! Run: cargo run --example 05_ownership
//!
//! This is Rust's most distinctive feature. Read carefully!
//!
//! The three ownership rules:
//!   1. Each value has exactly one owner.
//!   2. There can only be one owner at a time.
//!   3. When the owner goes out of scope, the value is dropped.

fn main() {
    // ── Stack vs Heap ─────────────────────────────────────────────────────────
    //
    // Stack: fixed-size data, very fast allocation. Integers, booleans, chars,
    //        arrays, tuples of stack types.
    // Heap:  variable-size or large data. Requires allocation and deallocation.
    //        String, Vec, Box, etc.

    // ── Move Semantics ───────────────────────────────────────────────────────
    //
    // When a heap-allocated value is assigned to another variable, ownership
    // *moves* — the original variable is no longer valid.

    let s1 = String::from("hello");  // s1 owns the String on the heap
    let s2 = s1;                     // ownership MOVES to s2; s1 is now invalid
    // println!("{s1}");             // compile error: s1 was moved
    println!("s2 = {s2}");

    // ── Clone ────────────────────────────────────────────────────────────────
    //
    // To keep both variables, explicitly deep-copy with .clone().
    let s3 = String::from("world");
    let s4 = s3.clone();            // s3 still valid; s4 is an independent copy
    println!("s3={s3}, s4={s4}");

    // ── Copy Types ───────────────────────────────────────────────────────────
    //
    // Types that live entirely on the stack implement the `Copy` trait.
    // Assignment copies the bits; the original is still usable.
    // Copy types: integers, floats, bool, char, tuples of Copy types.

    let x = 5;
    let y = x;  // x is *copied*, not moved
    println!("x={x}, y={y}");  // both valid

    // ── Ownership & Functions ─────────────────────────────────────────────────
    //
    // Passing a value to a function moves or copies it — same rules as assignment.

    let owned = String::from("ownership");
    takes_ownership(owned);        // owned is moved into the function
    // println!("{owned}");        // compile error: value moved

    let copied = 42;
    makes_copy(copied);            // i32 is Copy; copied is still valid
    println!("copied = {copied}");

    // ── Returning Ownership ───────────────────────────────────────────────────
    //
    // Functions can transfer ownership back via return values.

    let s5 = gives_ownership();
    println!("s5 = {s5}");

    let s6 = String::from("input");
    let s7 = takes_and_gives_back(s6);  // s6 moved in, returned as s7
    // println!("{s6}");                 // compile error
    println!("s7 = {s7}");

    // ── Scope & Drop ──────────────────────────────────────────────────────────
    {
        let inner = String::from("inner scope");
        println!("inner = {inner}");
    }  // `inner` goes out of scope; Rust calls `drop(inner)` — memory freed!
    // println!("{inner}"); // compile error: inner is out of scope

    println!("Ownership chapter complete!");
}

fn takes_ownership(s: String) {
    println!("got: {s}");
}  // s is dropped here

fn makes_copy(n: i32) {
    println!("got copy: {n}");
}  // n is just popped off the stack

fn gives_ownership() -> String {
    String::from("fresh string")  // ownership transferred to caller
}

fn takes_and_gives_back(s: String) -> String {
    s  // return ownership to caller
}
