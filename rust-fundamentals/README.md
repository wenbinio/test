# Rust Fundamentals

A hands-on Rust curriculum — from zero to confident.

## Prerequisites

Install Rust via [rustup](https://rustup.rs):

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Verify:

```sh
rustc --version
cargo --version
```

## How to use

Each chapter is a self-contained example. Run any chapter with:

```sh
cd rust-fundamentals
cargo run --example 01_hello_world
```

## Chapters

| # | Topic | Run |
|---|-------|-----|
| 01 | Hello, World! | `cargo run --example 01_hello_world` |
| 02 | Variables & Types | `cargo run --example 02_variables_types` |
| 03 | Functions | `cargo run --example 03_functions` |
| 04 | Control Flow | `cargo run --example 04_control_flow` |
| 05 | Ownership | `cargo run --example 05_ownership` |
| 06 | Borrowing & References | `cargo run --example 06_borrowing` |
| 07 | Structs | `cargo run --example 07_structs` |
| 08 | Enums & Pattern Matching | `cargo run --example 08_enums` |
| 09 | Error Handling | `cargo run --example 09_error_handling` |
| 10 | Collections | `cargo run --example 10_collections` |
| 11 | Traits | `cargo run --example 11_traits` |
| 12 | Generics | `cargo run --example 12_generics` |
| 13 | Closures | `cargo run --example 13_closures` |
| 14 | Iterators | `cargo run --example 14_iterators` |
| 15 | Lifetimes | `cargo run --example 15_lifetimes` |

## Learning Path

Work through the chapters in order. **Chapters 05–06 (ownership & borrowing)** are
Rust's most distinctive concept — take extra time there. Everything after builds on them.
