> **Path:** Developer Codex > Coding Standards > Method Size

# Method Size

*The size of a method is a common way to judge its complexity. Smaller methods are more likely to be reused and have been proven to reduce errors and increase efficiency.*

We want to keep things simple, which is usually short.

Keep in mind [SOLID principles](https://en.wikipedia.org/wiki/SOLID_\(object-oriented_design\)). A simple method should do one thing and be unit testable. Dependency injection, extension methods, and service methods are some good ways to simplify the code.

If breaking up the method makes it harder to read or debug then it is better to leave it as one long method. Two examples of this would be switch statements with lots of cases or when a lot of variables would have to be passed between the smaller methods. In the case of the large number of variables consider encapsulating them into an object or moving them to the class level. Otherwise, the large method is the lesser of two evils.
