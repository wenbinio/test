//! Chapter 13 — Closures
//! Run: cargo run --example 13_closures
//!
//! Topics: closure syntax, capturing environment, Fn/FnMut/FnOnce,
//!         move closures, closures in higher-order functions

fn main() {
    // ── Closure Syntax ────────────────────────────────────────────────────────
    // Closures are anonymous functions defined with `|params| body`.
    // Unlike functions, they can capture variables from their enclosing scope.

    let add_one = |x| x + 1;
    let add = |x, y| x + y;
    let greet = |name: &str| println!("Hello, {name}!");

    println!("{}", add_one(5));    // 6
    println!("{}", add(3, 4));     // 7
    greet("Alice");

    // Multi-line closure:
    let complex = |x: i32| {
        let doubled = x * 2;
        doubled + 10
    };
    println!("{}", complex(5));   // 20

    // ── Capturing Environment ─────────────────────────────────────────────────
    // A closure can borrow or move variables from the surrounding scope.

    let base = 10;
    let add_base = |x| x + base;   // captures `base` by shared reference
    println!("{}", add_base(5));   // 15
    println!("base still usable: {base}");

    let mut count = 0;
    let mut increment = || { count += 1; count }; // captures by mutable ref
    println!("{}", increment());   // 1
    println!("{}", increment());   // 2
    drop(increment);                // release the borrow
    println!("count after closure: {count}");  // 2

    // ── move Closures ─────────────────────────────────────────────────────────
    // `move` forces the closure to take ownership of captured variables.
    // Required when the closure must outlive the scope where it was created
    // (e.g., threads).

    let data = vec![1, 2, 3];
    let print_data = move || println!("{:?}", data);  // data moved into closure
    print_data();
    // `data` is no longer accessible here:
    // println!("{:?}", data);  // compile error

    // ── Fn Traits ─────────────────────────────────────────────────────────────
    // Closures implement one or more of these traits:
    //
    //   FnOnce  — can be called at least once; may consume captured values
    //   FnMut   — can be called multiple times; may mutate captured values
    //   Fn      — can be called multiple times; borrows captured values immutably
    //
    // All closures implement FnOnce. Fn is the most restrictive (most capable).

    // Takes any closure that maps i32 -> i32 and can be called many times:
    fn apply_twice(f: impl Fn(i32) -> i32, x: i32) -> i32 {
        f(f(x))
    }
    println!("{}", apply_twice(|x| x * 2, 3));   // 12
    println!("{}", apply_twice(|x| x + 10, 5));  // 25

    // FnOnce: closure consumes the captured value — can only be called once.
    fn call_once<F: FnOnce() -> String>(f: F) -> String {
        f()
    }
    let s = String::from("consumed");
    let consume = move || s;  // consumes s when called
    println!("{}", call_once(consume));

    // FnMut: closure can mutate captured state.
    fn apply_n_times<F: FnMut()>(mut f: F, n: u32) {
        for _ in 0..n {
            f();
        }
    }
    let mut total = 0;
    apply_n_times(|| total += 1, 5);
    println!("total = {total}");   // 5

    // ── Closures in Higher-Order Functions ────────────────────────────────────
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let evens: Vec<i32> = numbers.iter()
        .filter(|&&x| x % 2 == 0)
        .copied()
        .collect();
    println!("evens: {:?}", evens);

    let squares: Vec<i32> = numbers.iter()
        .map(|&x| x * x)
        .collect();
    println!("squares: {:?}", squares);

    let sum_of_even_squares: i32 = numbers.iter()
        .filter(|&&x| x % 2 == 0)
        .map(|&x| x * x)
        .sum();
    println!("sum of even squares: {sum_of_even_squares}");

    // sort_by uses a closure as a comparator:
    let mut words = vec!["banana", "apple", "cherry", "date"];
    words.sort_by(|a, b| a.len().cmp(&b.len()));
    println!("sorted by length: {:?}", words);

    // ── Returning Closures ────────────────────────────────────────────────────
    // Closures have unique types — use `impl Fn` or `Box<dyn Fn>` to return one.

    fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
        move |x| x + n   // `move` captures n
    }

    let add5  = make_adder(5);
    let add10 = make_adder(10);
    println!("add5(3)  = {}", add5(3));   // 8
    println!("add10(3) = {}", add10(3));  // 13

    // Box<dyn Fn> when the concrete type can't be named (e.g., conditional branches):
    fn make_op(double: bool) -> Box<dyn Fn(i32) -> i32> {
        if double { Box::new(|x| x * 2) }
        else      { Box::new(|x| x + 1) }
    }
    let op = make_op(true);
    println!("op(5) = {}", op(5));  // 10
}
