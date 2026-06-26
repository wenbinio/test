//! Chapter 12 — Generics
//! Run: cargo run --example 12_generics
//!
//! Topics: generic functions, structs, enums, impl blocks, trait bounds,
//!         monomorphization

use std::fmt::Display;

// ── Generic Functions ─────────────────────────────────────────────────────────
//
// `T` is a type parameter. Callers supply the concrete type.
// The compiler generates a separate copy of the function for each type used
// (called *monomorphization*) — so generics have zero runtime cost.

fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut max = &list[0];
    for item in list {
        if item > max {
            max = item;
        }
    }
    max
}

fn first<T>(list: &[T]) -> Option<&T> {
    list.first()  // delegates to the slice method
}

// Multiple type parameters:
fn zip_first<T, U>(a: &[T], b: &[U]) -> Option<(&T, &U)> {
    if a.is_empty() || b.is_empty() {
        None
    } else {
        Some((&a[0], &b[0]))
    }
}

// ── Generic Structs ───────────────────────────────────────────────────────────
#[derive(Debug)]
struct Pair<T> {
    first: T,
    second: T,
}

impl<T> Pair<T> {
    fn new(first: T, second: T) -> Self {
        Pair { first, second }
    }

    // `Self` is shorthand for `Pair<T>`.
    fn swap(self) -> Self {
        Pair { first: self.second, second: self.first }
    }
}

// Conditional implementation: only available when T: Display + PartialOrd.
impl<T: Display + PartialOrd> Pair<T> {
    fn print_largest(&self) {
        if self.first > self.second {
            println!("largest: {}", self.first);
        } else {
            println!("largest: {}", self.second);
        }
    }
}

// ── Generic Enum ──────────────────────────────────────────────────────────────
// (You already know these from the standard library!)
// enum Option<T> { Some(T), None }
// enum Result<T, E> { Ok(T), Err(E) }

// Custom generic enum:
#[derive(Debug)]
enum Either<L, R> {
    Left(L),
    Right(R),
}

impl<L: Display, R: Display> Either<L, R> {
    fn describe(&self) {
        match self {
            Either::Left(v)  => println!("Left({v})"),
            Either::Right(v) => println!("Right({v})"),
        }
    }
}

// ── Generic Struct With Multiple Type Params ──────────────────────────────────
#[derive(Debug)]
struct KeyValue<K, V> {
    key: K,
    value: V,
}

impl<K: Display, V: Display> KeyValue<K, V> {
    fn new(key: K, value: V) -> Self {
        KeyValue { key, value }
    }

    fn print(&self) {
        println!("{}: {}", self.key, self.value);
    }
}

// ── Blanket Implementations ───────────────────────────────────────────────────
// The standard library implements ToString for every type that implements Display:
//   impl<T: Display> ToString for T { ... }
// That's a blanket implementation — it's how .to_string() works on integers etc.

// ── Where Clauses for Readability ────────────────────────────────────────────
fn print_all<T>(items: &[T])
where
    T: Display,
{
    for item in items {
        print!("{item}  ");
    }
    println!();
}

fn main() {
    // Generic functions
    let numbers = vec![34, 50, 25, 100, 65];
    println!("largest number: {}", largest(&numbers));

    let chars = vec!['y', 'm', 'a', 'q'];
    println!("largest char: {}", largest(&chars));

    println!("first: {:?}", first(&numbers));
    println!("first of empty: {:?}", first::<i32>(&[]));

    let names = vec!["Alice", "Bob"];
    println!("zip_first: {:?}", zip_first(&numbers, &names));

    // Generic structs
    let pair = Pair::new(5, 10);
    pair.print_largest();
    let swapped = pair.swap();
    println!("swapped: {:?}", swapped);

    let str_pair = Pair::new("hello", "world");
    str_pair.print_largest();

    // Either enum
    let left: Either<i32, &str>  = Either::Left(42);
    let right: Either<i32, &str> = Either::Right("hello");
    left.describe();
    right.describe();

    // KeyValue
    let kv1 = KeyValue::new("name", "Alice");
    let kv2 = KeyValue::new(42, 3.14);
    kv1.print();
    kv2.print();

    // print_all works for any Display type
    print_all(&[1, 2, 3, 4, 5]);
    print_all(&["a", "b", "c"]);
}
