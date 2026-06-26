//! Chapter 15 — Lifetimes
//! Run: cargo run --example 15_lifetimes
//!
//! Topics: what lifetimes are, lifetime annotations in functions and structs,
//!         elision rules, 'static lifetime
//!
//! Lifetimes are how Rust's borrow checker tracks *how long* a reference is valid.
//! Most of the time the compiler infers them ("lifetime elision"); you only
//! write annotations when the compiler can't figure them out on its own.

fn main() {
    // ── The Problem Lifetimes Solve ───────────────────────────────────────────
    //
    // When a function returns a reference, the compiler needs to know which
    // input the returned reference came from, so it can ensure the source
    // data lives at least as long as the reference.

    let s1 = String::from("long string");
    let result;
    {
        let s2 = String::from("xyz");
        result = longest(s1.as_str(), s2.as_str());
        println!("longest: {result}");  // fine — result used while both live
    }
    // Using `result` here would be an error because s2 is gone.
    // The lifetime annotation on `longest` prevents that mistake.

    // ── Lifetime Annotations on Functions ────────────────────────────────────
    // The annotation `'a` says:
    //   "the returned reference will be valid for as long as BOTH x and y are"
    // i.e., the shorter of the two lifetimes.

    let s3 = String::from("hello");
    let s4 = String::from("world!");
    let r = longest(s3.as_str(), s4.as_str());
    println!("longest: {r}");

    // ── Lifetime Annotations on Structs ──────────────────────────────────────
    // A struct that holds a reference must annotate its lifetime.
    // It says: "an Excerpt can't outlive the string it references."

    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence;
    {
        let sentence = novel.split('.').next().expect("no period found");
        first_sentence = Excerpt { part: sentence };
        println!("excerpt: '{}'", first_sentence.part);
        println!("level: {}", first_sentence.level());
        // first_sentence is valid here because `novel` is still alive.
    }
    // Using first_sentence here would be an error if novel had been dropped.

    // ── Lifetime Elision ─────────────────────────────────────────────────────
    // Rust applies three rules to infer lifetimes:
    //
    //  Rule 1: Each reference parameter gets its own lifetime.
    //  Rule 2: If there is exactly one input lifetime, it is assigned
    //          to all output lifetimes.
    //  Rule 3: If one of the parameters is &self or &mut self, its lifetime
    //          is assigned to all output lifetimes.
    //
    // When the rules are enough, you don't write any annotations.

    // This function's annotation is elided (rule 2 applies):
    fn first_word(s: &str) -> &str {
        s.split_whitespace().next().unwrap_or("")
    }
    println!("first word: '{}'", first_word("hello world"));

    // ── 'static Lifetime ─────────────────────────────────────────────────────
    // 'static means the reference lives for the entire duration of the program.
    // String literals have type &'static str — they're baked into the binary.

    let s: &'static str = "I live forever";
    println!("{s}");

    // ── Combining Generics, Traits, and Lifetimes ─────────────────────────────
    println!("{}", longest_with_announcement(
        "long string",
        "xyz",
        "Comparing two strings!",
    ));

    // ── Lifetime in impl Blocks ───────────────────────────────────────────────
    let e = Excerpt { part: "some text" };
    println!("announce: {}", e.announce_and_return("testing"));
}

// ── Lifetime Annotations on Functions ────────────────────────────────────────
//
// 'a is a lifetime parameter. The return value borrows from whichever of
// x or y has the shorter lifetime.
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// ── Lifetime Annotations on Structs ──────────────────────────────────────────
struct Excerpt<'a> {
    part: &'a str,  // `part` cannot outlive the data it points into
}

impl<'a> Excerpt<'a> {
    // Rule 3 (self): return type lifetime inferred from &self.
    fn level(&self) -> i32 {
        3
    }

    fn announce_and_return(&self, announcement: &str) -> &str {
        println!("Attention: {announcement}");
        self.part  // lifetime of return comes from &self (rule 3)
    }
}

// ── Combining Generics + Trait Bounds + Lifetimes ────────────────────────────
use std::fmt::Display;

fn longest_with_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("Announcement: {ann}");
    if x.len() > y.len() { x } else { y }
}
