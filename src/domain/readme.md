#Domain Services

This is where we locate domain logic that doesn't belong to any one object conceptually.

Domain Services are most often executed by application layer Application Services / Use Cases. Because Domain Services are a part of the Domain Layer and adhere to the dependency rule, Domain Services aren't allowed to depend on infrastructure layer concerns like Repositories to get access to the domain entities that they interact with. Application Services fetch the necessary entities, then pass them to domain services to run allow them to interact.

#Domain Events

Domain events are simply objects that define some sort of event that occurs in the domain that domain experts care about.