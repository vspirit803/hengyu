import fetch from 'utils/fetch';

export function getList() {
  return fetch({
    url: '/article/list',
    method: 'get',
  });
}

export class ClassAIntendedCustomersService {
  static getClassAIntendedCustomers() {
    return fetch({
      url: 'intended_customers',
      method: 'get',
    });
  }

  static createClassAIntendedCustomer(createClassAIntendedCustomerDto) {
    return fetch({
      url: 'intended_customers',
      method: 'post',
      data: createClassAIntendedCustomerDto,
    });
  }

  static updateClassAIntendedCustomer(createClassAIntendedCustomerDto) {
    return fetch({
      url: 'intended_customers',
      method: 'patch',
      data: createClassAIntendedCustomerDto,
    });
  }
}
