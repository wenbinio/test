//! Chapter 14 — Iterators
//! Run: cargo run --example 14_iterators
//!
//! Topics: Iterator trait, adapters, consumers, chaining, custom iterators

fn main() {
    basics();
    adapters();
    consumers();
    chaining();
    custom_iterator();
}

fn basics() {
    println!("\n── Iterator Basics ──");

    // Three ways to get an iterator from a collection:
    let v = vec![10, 20, 30];

    // iter()       — yields &T   (borrows elements)
    // iter_mut()   — yields &mut T
    // into_iter()  — yields T    (consumes the collection)

    // All for loops use IntoIterator under the hood.
    for x in &v {      // equivalent to v.iter()
        print!("{x} ");
    }
    println!();

    // next() is the core method of the Iterator trait:
    let mut it = v.iter();
    println!("{:?}", it.next());  // Some(10)
    println!("{:?}", it.next());  // Some(20)
    println!("{:?}", it.next());  // Some(30)
    println!("{:?}", it.next());  // None
}

fn adapters() {
    println!("\n── Iterator Adapters ──");
    // Adapters transform one iterator into another. They are *lazy* —
    // no work happens until a consumer drives the iterator.

    let v = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // map: transform each element
    let doubled: Vec<i32> = v.iter().map(|&x| x * 2).collect();
    println!("map (doubled): {:?}", doubled);

    // filter: keep elements matching a predicate
    let evens: Vec<i32> = v.iter().filter(|&&x| x % 2 == 0).copied().collect();
    println!("filter (evens): {:?}", evens);

    // filter_map: filter + map in one step
    let strings = vec!["1", "two", "3", "four", "5"];
    let nums: Vec<i32> = strings.iter()
        .filter_map(|s| s.parse().ok())
        .collect();
    println!("filter_map (parse): {:?}", nums);

    // flat_map: map then flatten
    let words = vec!["hello world", "foo bar baz"];
    let all_words: Vec<&str> = words.iter()
        .flat_map(|s| s.split_whitespace())
        .collect();
    println!("flat_map (words): {:?}", all_words);

    // enumerate: attach an index
    let fruits = vec!["apple", "banana", "cherry"];
    let indexed: Vec<(usize, &&str)> = fruits.iter().enumerate().collect();
    println!("enumerate: {:?}", indexed);

    // zip: combine two iterators into pairs
    let names = vec!["Alice", "Bob", "Carol"];
    let scores = vec![95, 87, 92];
    let combined: Vec<_> = names.iter().zip(scores.iter()).collect();
    println!("zip: {:?}", combined);

    // take / skip
    let first3: Vec<_> = v.iter().take(3).collect();
    let skip3: Vec<_>  = v.iter().skip(3).collect();
    println!("take(3): {:?}", first3);
    println!("skip(3): {:?}", skip3);

    // take_while / skip_while
    let tw: Vec<_> = v.iter().take_while(|&&x| x < 5).collect();
    let sw: Vec<_> = v.iter().skip_while(|&&x| x < 5).collect();
    println!("take_while(<5): {:?}", tw);
    println!("skip_while(<5): {:?}", sw);

    // chain: concatenate two iterators
    let a = vec![1, 2, 3];
    let b = vec![4, 5, 6];
    let chained: Vec<_> = a.iter().chain(b.iter()).collect();
    println!("chain: {:?}", chained);

    // peekable: look at the next element without consuming it
    let mut peekable = v.iter().peekable();
    println!("peek: {:?}", peekable.peek());
    println!("next: {:?}", peekable.next());
    println!("peek again: {:?}", peekable.peek());

    // step_by
    let stepped: Vec<_> = (0..20).step_by(3).collect();
    println!("step_by(3): {:?}", stepped);

    // rev: reverse the iterator
    let reversed: Vec<_> = v.iter().rev().take(3).collect();
    println!("rev + take(3): {:?}", reversed);

    // flatten: one level of nesting removed
    let nested = vec![vec![1,2], vec![3,4], vec![5,6]];
    let flat: Vec<_> = nested.into_iter().flatten().collect();
    println!("flatten: {:?}", flat);
}

fn consumers() {
    println!("\n── Iterator Consumers ──");
    // Consumers drive the iterator to completion and produce a result.

    let v = vec![1, 2, 3, 4, 5];

    // collect: build a collection
    let doubled: Vec<i32> = v.iter().map(|&x| x * 2).collect();
    println!("collect: {:?}", doubled);

    // sum / product
    let sum: i32     = v.iter().sum();
    let product: i32 = v.iter().product();
    println!("sum={sum}, product={product}");

    // count
    println!("count={}", v.iter().count());

    // fold: general reduction (like reduce with an initial value)
    let sum_fold = v.iter().fold(0, |acc, &x| acc + x);
    println!("fold (sum)={sum_fold}");

    // max / min
    println!("max={:?}, min={:?}", v.iter().max(), v.iter().min());

    // any / all
    println!("any >3: {}", v.iter().any(|&x| x > 3));
    println!("all >0: {}", v.iter().all(|&x| x > 0));

    // find / position
    println!("find >3: {:?}",    v.iter().find(|&&x| x > 3));     // Some(4)
    println!("position >3: {:?}", v.iter().position(|&x| x > 3)); // Some(3)

    // for_each
    print!("for_each: ");
    v.iter().for_each(|&x| print!("{x} "));
    println!();

    // last
    println!("last: {:?}", v.iter().last());

    // nth
    println!("nth(2): {:?}", v.iter().nth(2));

    // unzip: split an iterator of pairs into two collections
    let pairs = vec![(1, 'a'), (2, 'b'), (3, 'c')];
    let (ints, chars): (Vec<i32>, Vec<char>) = pairs.into_iter().unzip();
    println!("unzip: {:?}, {:?}", ints, chars);
}

fn chaining() {
    println!("\n── Chaining Adapters ──");

    // The real power of iterators: zero-cost, composable pipelines.
    let result: Vec<String> = (1..=20)
        .filter(|x| x % 2 == 0)         // evens
        .map(|x| x * x)                  // squared
        .filter(|x| *x > 50)             // > 50
        .take(3)                          // first 3
        .map(|x| format!("[{x}]"))       // format
        .collect();
    println!("pipeline: {:?}", result);

    // Collecting into a HashMap:
    use std::collections::HashMap;
    let word_lengths: HashMap<&str, usize> = vec!["hello", "world", "rust"]
        .into_iter()
        .map(|w| (w, w.len()))
        .collect();
    println!("word lengths: {:?}", word_lengths);
}

fn custom_iterator() {
    println!("\n── Custom Iterator ──");

    // Implement the Iterator trait to make your own.
    struct Counter {
        count: u32,
        max: u32,
    }

    impl Counter {
        fn new(max: u32) -> Counter {
            Counter { count: 0, max }
        }
    }

    impl Iterator for Counter {
        type Item = u32;   // the type yielded by next()

        fn next(&mut self) -> Option<Self::Item> {
            if self.count < self.max {
                self.count += 1;
                Some(self.count)
            } else {
                None
            }
        }
    }

    // Because we implemented Iterator, ALL adapter and consumer methods are free:
    let c: Vec<u32> = Counter::new(5).collect();
    println!("counter: {:?}", c);

    let sum: u32 = Counter::new(5).sum();
    println!("sum: {sum}");

    // Zip two counters:
    let pairs: Vec<_> = Counter::new(3)
        .zip(Counter::new(3).skip(1))
        .collect();
    println!("zipped: {:?}", pairs);
}
