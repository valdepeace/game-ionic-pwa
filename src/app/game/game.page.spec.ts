import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { GamePage } from './game.page';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


describe('############### GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;
  let router: Router;
  let userService: UserService;
  let store = {};
  // config component
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GamePage],
      imports: [RouterTestingModule.withRoutes([]), IonicModule.forRoot()],
      providers: [UserService]
    }).compileComponents();

    // config fake window.localstorage in user service
    // eslint-disable-next-line @typescript-eslint/naming-convention


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

    userService = TestBed.inject(UserService);
    userService.username = 'Supergame';
    userService.score = 0;
    userService.saveCurrentUser();
    fixture = TestBed.createComponent(GamePage);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
  it('should use ValueService', () => {
    expect(userService.setCurrentUser('current_user')).toBe(true);
  });
  it('Test init game', () => {
    const buttonMoveLeft = fixture.debugElement.nativeElement.querySelector('#button_moveleft');
    buttonMoveLeft.click();
    expect(component.score).toBe(1);
  });
  it('Test click: init left, rigth, left, rigth score = 4', () => {
    const buttonMoveLeft = fixture.debugElement.nativeElement.querySelector('#button_moveleft');
    const buttonMoveRigth = fixture.debugElement.nativeElement.querySelector('#button_moverigth');
    buttonMoveLeft.click();
    buttonMoveRigth.click();
    buttonMoveLeft.click();
    buttonMoveRigth.click();
    expect(component.score).toBe(4);
  });

  it('Test click some button: init left, rigth, left, left score = 0', () => {
    const buttonMoveLeft = fixture.debugElement.nativeElement.querySelector('#button_moveleft');
    const buttonMoveRigth = fixture.debugElement.nativeElement.querySelector('#button_moverigth');
    buttonMoveLeft.click();
    buttonMoveRigth.click();
    buttonMoveLeft.click();
    buttonMoveLeft.click();
    expect(component.score).toBe(0);
  });

  it('Test init green ligth game and init time', () => {
    component.green();
    expect(component.greenLight).toBe(true);
  });

  it('Test change route when click submit button join', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#button_exit');
    const spy = spyOn(router, 'navigate');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();
    expect(spy.calls.first().args[0]).toContain('/home');
  });
});
