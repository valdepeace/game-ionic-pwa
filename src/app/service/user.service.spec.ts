import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';


describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => key in store ? store[key] : null,
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(window.localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(window.localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(window.localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(window.localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get username SuperGame', () => {
    const user = {
      username: 'SuperGame',
      score: 0
    };
    window.localStorage.setItem('SuperGame', JSON.stringify(user));
    const u = service.getUserFromLocalStorage('SuperGame');
    expect(u.username).toEqual('SuperGame');
  });

  it('Set username SuperGame', () => {
    const user = {
      username: 'SuperGame',
      score: 0
    };
    window.localStorage.setItem('SuperGame', JSON.stringify(user));
    const u = service.getUserFromLocalStorage('SuperGame');
    expect(u.username).toEqual('SuperGame');
  });
});
