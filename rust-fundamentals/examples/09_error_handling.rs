//! Chapter 09 — Error Handling
//! Run: cargo run --example 09_error_handling
//!
//! Topics: panic!, Result<T,E>, ?, unwrap, expect, custom errors

use std::fmt;
use std::num::ParseIntError;

fn main() {
    // ── panic! ────────────────────────────────────────────────────────────────
    // Use panic! for truly unrecoverable situations or programming bugs.
    // It unwinds the stack and prints an error message.
    // (Commented out so the example keeps running.)
    // panic!("something went terribly wrong");

    // Vec index out of bounds → panic at runtime:
    // let v = vec![1, 2, 3];
    // let _ = v[99];

    // ── Result<T, E> ──────────────────────────────────────────────────────────
    // Result is Rust's primary error-handling type:
    //   enum Result<T, E> { Ok(T), Err(E) }
    //
    // The Ok variant holds a success value, Err holds an error.

    // parse() returns Result<i32, ParseIntError>:
    let good: Result<i32, _> = "42".parse();
    let bad:  Result<i32, _> = "abc".parse();

    match good {
        Ok(n)  => println!("parsed: {n}"),
        Err(e) => println!("error:  {e}"),
    }
    match bad {
        Ok(n)  => println!("parsed: {n}"),
        Err(e) => println!("error:  {e}"),
    }

    // ── unwrap / expect ───────────────────────────────────────────────────────
    // Use these only when you're certain the Result is Ok,
    // or in quick prototypes. They panic on Err.
    let n = "7".parse::<i32>().unwrap();            // panics if Err
    let m = "8".parse::<i32>().expect("must be a number"); // panics with message
    println!("n={n}, m={m}");

    // ── Handy Result Methods ──────────────────────────────────────────────────
    let r: Result<i32, &str> = Ok(10);
    println!("{:?}", r.map(|x| x * 2));         // Ok(20)
    println!("{}",   r.unwrap_or(0));            // 10
    println!("{}",   r.unwrap_or_default());     // 10

    let e: Result<i32, &str> = Err("oops");
    println!("{}", e.unwrap_or(99));             // 99
    println!("{:?}", e.map_err(|s| s.len()));   // Err(4)

    // ── The ? Operator ────────────────────────────────────────────────────────
    // `?` is shorthand for: if Err, return early with the error.
    // It can only be used in functions that return Result (or Option).

    match parse_and_double("21") {
        Ok(n)  => println!("parse_and_double(\"21\") = {n}"),
        Err(e) => println!("error: {e}"),
    }
    match parse_and_double("xyz") {
        Ok(n)  => println!("parse_and_double(\"xyz\") = {n}"),
        Err(e) => println!("error: {e}"),
    }

    // ── Chaining Results ──────────────────────────────────────────────────────
    match parse_positive("5") {
        Ok(n)  => println!("parse_positive(\"5\") = {n}"),
        Err(e) => println!("error: {e}"),
    }
    match parse_positive("-3") {
        Ok(n)  => println!("parse_positive(\"-3\") = {n}"),
        Err(e) => println!("error: {e}"),
    }

    // ── Custom Error Type ─────────────────────────────────────────────────────
    match risky_operation(10) {
        Ok(v)  => println!("risky_operation(10) = {v}"),
        Err(e) => println!("risky_operation error: {e}"),
    }
    match risky_operation(0) {
        Ok(v)  => println!("risky_operation(0) = {v}"),
        Err(e) => println!("risky_operation error: {e}"),
    }
}

// The `?` operator: if parse fails, the Err is returned immediately.
fn parse_and_double(s: &str) -> Result<i32, ParseIntError> {
    let n = s.parse::<i32>()?;  // `?` unwraps Ok or returns Err early
    Ok(n * 2)
}

// Return a custom error using a string for simplicity here.
fn parse_positive(s: &str) -> Result<i32, String> {
    let n = s.parse::<i32>().map_err(|e| e.to_string())?;
    if n < 0 {
        return Err(format!("{n} is not positive"));
    }
    Ok(n)
}

// ── Custom Error Type ─────────────────────────────────────────────────────────
#[derive(Debug)]
enum AppError {
    DivisionByZero,
    NegativeInput(i32),
}

// Implement Display so the error prints nicely.
impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::DivisionByZero      => write!(f, "division by zero"),
            AppError::NegativeInput(n)    => write!(f, "negative input: {n}"),
        }
    }
}

// Implement std::error::Error (required to be a proper error type).
impl std::error::Error for AppError {}

fn risky_operation(x: i32) -> Result<i32, AppError> {
    if x < 0 {
        return Err(AppError::NegativeInput(x));
    }
    if x == 0 {
        return Err(AppError::DivisionByZero);
    }
    Ok(100 / x)
}
