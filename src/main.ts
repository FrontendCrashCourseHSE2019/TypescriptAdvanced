//<editor-fold desc="Fun with functions">
interface Test {

}

function foo(value: number, anotherValue: string): Test {
    console.log(value);
    console.log(anotherValue);
    return {};
}

let bar = (value: number, anotherValue: string): Test => {
    console.log(value);
    console.log(anotherValue);
    return {};
};

foo(10, "20");

bar(10, "20");

const typedFoo: (value: number, anotherValue: string) => Test = bar;

const typedBar: (value: number, anotherValue: string) => Test = foo;

typedFoo(10, "20");
typedBar(10, "20");
//</editor-fold>


//<editor-fold desc="Interface function/object">
interface FunctionalInterface {
    (value: number, anotherValue: string): Test;
}

const interfacedFoo: FunctionalInterface = bar;


interface AnyFieldInterface {

    test: number;

    [key: string]: Test;

}

let val: AnyFieldInterface = {
    test: 10,
    zzz: {}
};

// именное поле
let testNumber: number = val.test;

// "какое-то" поле
let zzzValue: Test = val.zzz;
//</editor-fold>


//<editor-fold desc="Generics">
interface List<T> {

    get(i: number): T;

    remove(i: number): T;

    add(value: T): void;

    size(): number;

}

class ArrayList<T> implements List<T> {

    private backingArray: T[] = [];

    add(value: T) {
        this.backingArray.push(value);
    }

    get(i: number): T {
        return this.backingArray[i];
    }

    size(): number {
        return this.backingArray.length;
    }

    remove(i: number): T {
        return this.backingArray.splice(i, 1)[0];
    }

}

//<editor-fold desc="list usage">
let lst = new ArrayList<string>();
lst.add("foo");
lst.add("bar");
lst.add("baz");

console.log(lst.get(1));
lst.remove(0);
lst.remove(0);
lst.remove(0);

console.log(lst.size());
//</editor-fold>
//</editor-fold>


//<editor-fold desc="ADVANCED">
//<editor-fold desc="http client">
class HttpClient {

    private persons: Person[] = [];
    private shoppingItems: ShoppingItem[] = [];

    constructor() {
        this.persons.push(new Person("bla-bla", "Ivan", "Ivanov"));
        this.persons.push(new Person("foo-foo", "Petr", "Petrov"));
        this.persons.push(new Person("bar-bar", "Alexander", "Alexandrov"));
        this.persons.push(new Person("baz-baz", "Sergey", "Sergeyev"));

        this.shoppingItems.push(new ShoppingItem(1, "Perpetum Mobile"));
        this.shoppingItems.push(new ShoppingItem(2, "Учебник по TS"));
        this.shoppingItems.push(new ShoppingItem(3, "Tesla Model Y"));
        this.shoppingItems.push(new ShoppingItem(4, "Raspberry PI3"));
        this.shoppingItems.push(new ShoppingItem(5, "ZooKeeper"));
    }

    findAll(url: string): any[] {
        switch (url) {
            case "persons":
                return this.persons;
            case "shoppingItems":
                return this.shoppingItems;
        }
        return [];
    }

    findById(url: string, id: any): any {
        switch (url) {
            case "persons":
                return this.persons.find(value => value.passport === id);
            case "shoppingItems":
                return this.shoppingItems.find(value => value.id === id);
        }
        return null;
    }

}
//</editor-fold>


interface DataService<DATA_TYPE, ID_TYPE> {

    url: string;

    findById(id: ID_TYPE): DATA_TYPE;

    findAll(): DATA_TYPE[];

}


//<editor-fold desc="Person">
class Person {

    private _passport: string;

    private _firstName: string;

    private _surName: string;

    constructor(passport: string, firstName: string, surName: string) {
        this._passport = passport;
        this._firstName = firstName;
        this._surName = surName;
    }


    get passport(): string {
        return this._passport;
    }

    get firstName(): string {
        return this._firstName;
    }

    get surName(): string {
        return this._surName;
    }

}
//</editor-fold>


//<editor-fold desc="Shopping Item">
class ShoppingItem {

    private _id: number;

    private _title: string;


    constructor(id: number, title: string) {
        this._id = id;
        this._title = title;
    }


    get id(): number {
        return this._id;
    }


    get title(): string {
        return this._title;
    }
}
//</editor-fold>

const httpClient = new HttpClient();

//<editor-fold desc="PersonService">
class PersonService implements DataService<Person, string> {

    url: string = "persons";

    constructor() {

    }

    findAll(): Person[] {
        return httpClient.findAll(this.url);
    }

    findById(id: string): Person {
        return httpClient.findById(this.url, id);
    }

}
//</editor-fold>

//<editor-fold desc="ShoppingItemService">
class ShoppingItemService implements DataService<ShoppingItem, number> {

    url: string = "shoppingItems";

    constructor() {

    }

    findAll(): ShoppingItem[] {
        return httpClient.findAll(this.url);
    }

    findById(id: number): ShoppingItem {
        return httpClient.findById(this.url, id);
    }

}
//</editor-fold>

//<editor-fold desc="Services usage">
let personService = new PersonService();
let shoppingService = new ShoppingItemService();

let people = personService.findAll();

console.log(people);

let shoppingItems = shoppingService.findAll();

console.log(shoppingItems);

let person = personService.findById("bar-bar");
let item = shoppingService.findById(1);

console.log(person);
console.log(item);
//</editor-fold>
//</editor-fold>