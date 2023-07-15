import React from 'react';
import SingleCheckbox from './Shared/SingleCheckBox';
import PersonType from './Shared/PersonType';
import PaymentType from './Shared/PaymentType';
import Button from './Shared/Button';
import TicketClass from './Shared/TicketClass';

const AllDropdowns = () => {
    return (
        <>
            <SingleCheckbox></SingleCheckbox>
            <PersonType></PersonType>
            <TicketClass></TicketClass>
            <PaymentType></PaymentType>
            <Button></Button>

        </>
    );
};

export default AllDropdowns;