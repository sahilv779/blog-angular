import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuthRedirectComponent } from './oauth-redirect.component';

describe('OAuthRedirectComponent', () => {
  let component: OAuthRedirectComponent;
  let fixture: ComponentFixture<OAuthRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OAuthRedirectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OAuthRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
