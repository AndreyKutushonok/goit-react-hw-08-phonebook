import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';

export default function ContactsPage() {
    return (
        <div>
            <ContactForm />
            <h2>Contacts</h2>
            <Filter />
            <ContactList />
        </div>
    );
}
