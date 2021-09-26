import fetch from 'node-fetch';
import * as faker from 'faker';

async function ttt(): Promise<void> {
  for (let i = 0; i < 1000; i++) {
    const name = faker.name;
    const internet = faker.internet;
    const company = faker.company;
    const address = faker.address;
    const phone = faker.phone;
    const customerData: {
      firstName: string;
      lastName: string;
      email: string;
      company: string;
      address: string;
      postalCode: string;
      mobile: string;
    } = {
      firstName: name.firstName().toString(),
      lastName: name.lastName().toString(),
      email: internet.email().toString(),
      company: company.companyName().toString(),
      address: address.streetAddress().toString(),
      postalCode: address.zipCode().toString(),
      mobile: '+8801765951292', //phone.phoneNumber().toString(),
    };

    //console.log(JSON.stringify(customerData));

    const response = await fetch('http://127.0.0.1:3000/customer/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });
    const data = await response.json();
    console.log(data);
  }
}

ttt();
