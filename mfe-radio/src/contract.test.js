const eventBus = {
  listeners: {},

  on(event, callback) {
    this.listeners[event] = callback;
  },

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event](data);
    }
  }
};

describe('Radio Contract Test', () => {

  test('radio:broadcast respecte le contrat', (done) => {
    eventBus.on('radio:broadcast', (data) => {
      // ✅ Vérifier les propriétés
      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('frequency');
      expect(data).toHaveProperty('isEmergency');

      // ✅ Vérifier les types
      expect(typeof data.message).toBe('string');
      expect(typeof data.frequency).toBe('string');
      expect(typeof data.isEmergency).toBe('boolean');

      done();
    });

    //  Simulation d’un broadcast (comme ton MFE)
    eventBus.emit('radio:broadcast', {
      message: 'Test radio message',
      frequency: '101.7',
      isEmergency: true,
    });
  });

});
test('radio:broadcast avec message non urgent', (done) => {
  eventBus.on('radio:broadcast', (data) => {
    expect(data.isEmergency).toBe(false);
    done();
  });

  eventBus.emit('radio:broadcast', {
    message: 'Peace message',
    frequency: '88.8',
    isEmergency: false,
  });
});