---
description: "Use when understanding Rock's core entity framework, data models, and how entities like Person manage data properties and relationships"
source: "https://community.rockrms.com/developer/202---ignition"
sourceLabel: 202 — Ignition
---
> **Path:** 

## More than Blocks

There is more to Rock than blocks. Under the covers Rock is a framework full of rich entities that let you manage people, families, groups, campuses, locations, dictionary-like-lists, and much more. And if those things don't meet your needs, you can even create your own custom entities within the framework too.

In this book we'll tell you a little about the major Rock entities, and then wrap up with details you'll need to develop your own custom entities. But first let's talk more about the concept of an entity.

## What Are Entities?

The word "entity" is just a generic term that refers to a code class that models and manages a particular type of data. These classes are built on something called the [Entity Framework](https://msdn.microsoft.com/en-us/data/aa937723) (EF). EF is Microsoft's recommended data access technology -- but don't worry! You do not need to know all the ins-and-outs of EF unless you really want to. We only mention it because some of the conventions you'll read below come from that framework. Ok, back to our story...

Note

If you are new to Entity Framework and want to learn more about what's going on behind the scenes in Rock, you can read the [Get Started with Entity Framework](https://msdn.microsoft.com/en-us/ee712907) and/or the [Working With DbContext](https://msdn.microsoft.com/en-us/jj729737) MSDN articles.  

Let's get real by talking specifics. And, since everyone knows what a person is, we'll use it as we describe how entities work.

The Person *entity* is actually the `Person.cs` class. That class models the properties of a person including FirstName, LastName, BirthDate, Gender, and Email just to name a few. So, when code somewhere creates a new Person object and saves it, a new record is added to the database which contains all the person's property values... mostly.

Some classes have virtual properties (such as the Person class Age property). These virtual properties decorated with the \[NotMapped\] attribute don't actually store their values in the database. Instead they are basically computed via code in a getter method as seen here:

```
[NotMapped]
[DataMember]
public virtual int? Age
{
    get
    {
        if ( BirthYear.HasValue )
        {
            DateTime? bd = BirthDate;
            if ( bd.HasValue )
            {
                DateTime today = RockDateTime.Today;
                int age = today.Year - bd.Value.Year;
                if ( bd.Value > today.AddYears( -age ) ) {age--};
                return age;
            }
        }
        return null;
    }
    private set { }
}
```

Note

Virtual properties are almost always decorated with the `[NotMapped]` data annotation (or C# attribute) which is a signal to Entity Framework to *not store* the value in the database. The `[DataMember]` annotation is used to tell the [framework to serialize these](https://docs.microsoft.com/en-us/aspnet/web-api/overview/formats-and-model-binding/json-and-xml-serialization#what-gets-serialized) properties because we've decorated our classes with the `[DataContract]` attribute. If this sort of thing interests you, [read about it](https://msdn.microsoft.com/en-us/library/system.runtime.serialization.datacontractattribute\(v=vs.110\).aspx) on the MSDN site.  

Some virtual properties hold other entities or whole collections of entities. For example, the person PrimaryAlias property holds a PersonAlias entity, but the PhoneNumbers property holds a collection of PhoneNumber entities.

```
[DataMember]
public virtual ICollection<PhoneNumber> PhoneNumbers
{
    get { return _phoneNumbers; }
    set { _phoneNumbers = value; }
}
private ICollection<PhoneNumber> _phoneNumbers;
```

For the virtual properties that are entities but not collections, you will see two parts. One property holds the entity as a "navigation property" and the other property holds the associated Id. Let's look at the person's Photo property. Here you see a Photo and a PhotoId property:

```
[DataMember]
public virtual BinaryFile Photo { get; set; }

[DataMember]
public int? PhotoId { get; set; }
```

This is very cool because [EF will Lazy Load](https://msdn.microsoft.com/en-us/data/jj574232#lazy) the Photo property-entity if you need to refer to it. In those cases, you have full access to that entity as shown here:

```
// assuming you have a person object/instance already...
var personPhotoFile = person.Photo.FileName;
```

I don't know about you, but that just makes me a little giddy inside.

Note

While it is cool, lazy loading comes at a performance cost: meaning behind the scenes the framework has to issue another database query to get the value. So, if you know you're going to need it, tell the framework to eagerly pre-load your navigable object properties as discussed in the [101 Launchpad book on Loading Entities](https://community.rockrms.com/page/3553?slug=loading-entities#eager-loading-properties).  

To make it work like that we had to tell EF about this relationship via a PersonConfiguration (Entity Configuration) class in our `Person.cs` class:

```
/// <summary>
/// Person Configuration class.
/// </summary>
public partial class PersonConfiguration : EntityTypeConfiguration<Person>
{
    public PersonConfiguration()
    {
        /// ...
        this.HasOptional( p => p.Photo ).WithMany()
            .HasForeignKey( p => p.PhotoId ).WillCascadeOnDelete( false );
        /// ...
    }
```

Note

Again, you don't really need to understand this last part unless you're creating your own custom entities. We'll cover that in the last several chapters of this book.
