> **Path:** Developer Codex > Coding Standards > Trip Hazards

# Trip Hazards

**Don't leave these lying around for other developers to trip over.**

1.  Multiple inline assignments. i.e. `thingOne = thingTwo = thingThree = "Hello";` While this is perfectly valid C# code, it trades readability for efficiency. Keep to one operation per line. `thingOne = "Hello"; thingTwo = thingOne; thingThree = thingTwo;` Also note that this can have unintended consequences with multiple objects referencing the same variable location in memory.
2.  There are a few instances where we use TPT models (Table-Per-Type): LearningClass and LearningParticipant. These classes and their base classes (Group and GroupMember) can sometimes require some extra care. There are some rare edge cases that can crop up stemming from the fact that Entity Framework will return a LearningClass even if you ask for a Group, if that Group happens to **be** a LearningClass. There is a detailed engineering note on the Group class describing all these potential pitfalls.
