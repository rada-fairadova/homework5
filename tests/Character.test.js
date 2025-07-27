import Character from '../src/Character';

describe('Character', () => {
  test('should create a character with valid name and type', () => {
    const character = new Character('Alice', 'Magician');
    expect(character.name).toBe('Alice');
    expect(character.type).toBe('Magician');
    expect(character.health).toBe(100);
    expect(character.level).toBe(1);
  });

  test('should throw error for invalid name length', () => {
    expect(() => new Character('A', 'Magician')).toThrow('Name must be a string with length between 2 and 10 characters');
    expect(() => new Character('VeryLongNameHere', 'Magician')).toThrow('Name must be a string with length between 2 and 10 characters');
  });

  test('should throw error for invalid type', () => {
    expect(() => new Character('Alice', 'InvalidType')).toThrow('Invalid type. Valid types are: Bowman, Swordsman, Magician, Daemon, Undead, Zombie');
  });

  test('levelUp should increase level and stats', () => {
    const character = new Character('Alice', 'Magician');
    character.attack = 10;
    character.defence = 40;
    character.levelUp();
    expect(character.level).toBe(2);
    expect(character.attack).toBe(12);
    expect(character.defence).toBe(48);
    expect(character.health).toBe(100);
  });

  test('levelUp should throw error when health is 0', () => {
    const character = new Character('Alice', 'Magician');
    character.health = 0;
    expect(() => character.levelUp()).toThrow('Cannot level up a dead character');
  });

  test('damage should reduce health', () => {
    const character = new Character('Alice', 'Magician');
    character.defence = 40;
    character.damage(50);
    expect(character.health).toBeLessThan(100);
    expect(character.health).toBeGreaterThan(0);
  });

  test('damage should not reduce health below 0', () => {
    const character = new Character('Alice', 'Magician');
    character.health = 10;
    character.defence = 0;
    character.damage(20);
    expect(character.health).toBe(0);
  });

  test('damage should do nothing when health is already 0', () => {
    const character = new Character('Alice', 'Magician');
    character.health = 0;
    character.damage(20);
    expect(character.health).toBe(0);
  });
});