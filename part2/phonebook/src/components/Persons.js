const Persons = ({newSearch, persons, removePerson}) => {
    const personsToShow =  (newSearch.length === 0)
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch))
    return (
    <div>
    {personsToShow.map(person => 
            <div>
                {person.name}  {person.number} 
                <button type="submit"  onClick={() => removePerson(person.id)}>
                   delete        
              </button>
            </div>

    )}
    </div>
    )
}

export default Persons


