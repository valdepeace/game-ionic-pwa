import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { HomePage } from './home.page';
import { Router } from '@angular/router';



describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;
  let formBuilder: FormBuilder;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [FormsModule, RouterTestingModule.withRoutes([]), IonicModule.forRoot(), ReactiveFormsModule, FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    router = TestBed.inject(Router);
    formBuilder = TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      nick: new FormControl('', Validators.required)
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Property binding value', ()=> {
    const inputNickElement = fixture.debugElement.nativeElement.querySelector('#nick');
    expect(inputNickElement).toBeTruthy();
    expect(inputNickElement.value).toEqual('');
  });

  it('Test a two way binding',()=> {
    const inputNickElement = fixture.debugElement.nativeElement.querySelector('#nick');
    expect(inputNickElement).toBeTruthy();
    expect(component.nick).toEqual('');
    expect(inputNickElement.value).toEqual('');
    inputNickElement.value = 'Modal updated';
    fixture.detectChanges();
    fixture.whenStable().then(res => {
      const updatedInputNickElement = fixture.debugElement.nativeElement.querySelector('#nick');
      expect(updatedInputNickElement.value).toEqual('Modal updated');
    });
  });

  it('Test change route when click submit button join',()=> {
    const button = fixture.debugElement.nativeElement.querySelector('#join');
    const spy = spyOn(router, 'navigate');
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();
    expect(spy.calls.first().args[0]).toContain('/game');
  });
});
