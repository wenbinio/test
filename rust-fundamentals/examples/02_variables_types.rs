//! Chapter 02 — Variables & Data Types
//! Run: cargo run --example 02_variables_types
//!
//! Topics: let, mut, const, shadowing, scalar types, compound types

fn main() {
    // ── Variables & Mutability ────────────────────────────────────────────────

    let x = 5;      // immutable by default
    println!("x = {}", x);
    // x = 6;       // compile error: cannot assign twice to immutable variable

    let mut y = 5;  // `mut` makes it mutable
    println!("y before = {}", y);
    y = 6;
    println!("y after  = {}", y);

    // Shadowing: re-declare the same name with `let`.
    // The old binding is hidden; the new one can even change type.
    let x = x + 1;      // shadows previous x (6)
    let x = x * 2;      // shadows again (12)
    println!("x after shadowing = {}", x);

    let spaces = "   ";          // type: &str
    let spaces = spaces.len();   // shadows with type: usize
    println!("spaces = {}", spaces);

    // ── Constants ────────────────────────────────────────────────────────────

    // Constants: always immutable, type required, evaluated at compile time.
    const MAX_POINTS: u32 = 100_000;  // `_` is a visual separator in numbers
    println!("MAX_POINTS = {}", MAX_POINTS);

    // ── Integer Types ────────────────────────────────────────────────────────
    //
    //  Signed:    i8  i16  i32  i64  i128  isize
    //  Unsigned:  u8  u16  u32  u64  u128  usize
    //
    //  Default inferred type is i32.

    let a: i32  = -42;
    let b: u64  = 1_000_000;
    let c: u8   = 255;
    println!("a={a}, b={b}, c={c}");

    // Integer literals in different bases:
    let decimal = 98_222;       // decimal
    let hex     = 0xff;         // hexadecimal  (255)
    let octal   = 0o77;         // octal        (63)
    let binary  = 0b1111_0000;  // binary       (240)
    let byte    = b'A';         // byte literal (65), type u8
    println!("{decimal} {hex} {octal} {binary} {byte}");

    // Integer overflow: in debug builds → panic; in release → wraps.
    // Use checked_add, wrapping_add, saturating_add for explicit control:
    let big: u8 = 255;
    println!("255u8.wrapping_add(1) = {}", big.wrapping_add(1)); // 0
    println!("255u8.saturating_add(1) = {}", big.saturating_add(1)); // 255

    // ── Floating-Point Types ─────────────────────────────────────────────────
    //
    //  f32  — 32-bit single precision
    //  f64  — 64-bit double precision (default)

    let f1: f64 = 3.141_592_653_589_793;
    let f2: f32 = 2.718;
    println!("f1={f1}, f2={f2}");
    println!("f64::INFINITY = {}", f64::INFINITY);
    println!("f64::NAN is NaN: {}", f64::NAN.is_nan());

    // ── Boolean ──────────────────────────────────────────────────────────────
    let t: bool = true;
    let f: bool = false;
    println!("t={t}, f={f}, AND={}", t && f);

    // ── Character ────────────────────────────────────────────────────────────
    // `char` is 4 bytes and represents a Unicode scalar value.
    let ch    = 'z';
    let emoji = '🦀';   // Ferris the crab
    let kanji = '日';
    println!("ch={ch}, emoji={emoji}, kanji={kanji}");

    // ── Tuples ───────────────────────────────────────────────────────────────
    // Fixed-length, can mix types.
    let tup: (i32, f64, u8) = (500, 6.4, 1);

    // Destructuring
    let (p, q, r) = tup;
    println!("p={p}, q={q}, r={r}");

    // Index access with `.0`, `.1`, ...
    println!("tup.0={}, tup.1={}", tup.0, tup.1);

    // The empty tuple `()` is called the "unit" type — represents nothing.
    let _unit: () = ();

    // ── Arrays ───────────────────────────────────────────────────────────────
    // Fixed-length, every element must be the same type.
    // Stored on the stack.
    let arr  = [1, 2, 3, 4, 5];
    let arr2: [i32; 5] = [1, 2, 3, 4, 5];  // type annotation: [T; N]
    let arr3 = [0; 10];                     // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    println!("arr[0]={}, arr2[4]={}, arr3={:?}", arr[0], arr2[4], arr3);
    println!("arr.len() = {}", arr.len());

    // Out-of-bounds access panics at runtime (caught by the borrow checker where possible).
}
