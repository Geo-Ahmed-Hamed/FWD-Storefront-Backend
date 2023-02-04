import { OrderStore } from '../../models/order';

const store = new OrderStore()

describe("Order Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a complete method', () => {
    expect(store.complete).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });

});