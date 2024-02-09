import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SeriesFavoritesPage } from './series-favorites.page';
import { IonicModule, LoadingController, NavController } from '@ionic/angular';
import { SeriesService } from 'src/app/services/series-service.service';
import { Show } from 'src/app/services/types';

describe('SeriesFavoritesPage', () => {
  let component: SeriesFavoritesPage;
  let fixture: ComponentFixture<SeriesFavoritesPage>;
  let seriesServiceMock: jasmine.SpyObj<SeriesService>;
  let loadingControllerMock: jasmine.SpyObj<LoadingController>;
  let navCtrlMock: jasmine.SpyObj<NavController>;
  
  beforeEach(waitForAsync(() => {
    seriesServiceMock = jasmine.createSpyObj('SeriesService', ['getFavorites', 'deleteSeriesFavorites']);
    loadingControllerMock = jasmine.createSpyObj('LoadingController', ['create', 'dismiss']);
    navCtrlMock = jasmine.createSpyObj('NavController', ['navigateForward']);

    TestBed.configureTestingModule({
      declarations: [SeriesFavoritesPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        HttpClient,
        { provide: SeriesService, useValue: seriesServiceMock },
        { provide: LoadingController, useValue: loadingControllerMock },
        { provide: NavController, useValue: navCtrlMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(SeriesFavoritesPage);
    component = fixture.componentInstance;
    (component as any).isLoading = {
      present: () => Promise.resolve(),
      dismiss: () => Promise.resolve()
    };    
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch favorites on ngOnInit', async () => {
    const favorites: Show[] = [{ id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8.5 } }];
    seriesServiceMock.getFavorites.and.returnValue(favorites);

    await component.ngOnInit();

    expect(seriesServiceMock.getFavorites).toHaveBeenCalled();
    expect(component.series).toEqual(favorites);
  });

  it('should fetch favorites on ionViewWillEnter', async () => {
    const favorites: Show[] = [{ id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8.5 } }];
    seriesServiceMock.getFavorites.and.returnValue(favorites);

    await component.ionViewWillEnter();

    expect(seriesServiceMock.getFavorites).toHaveBeenCalled();
    expect(component.series).toEqual(favorites);
  });

  it('should navigate to series details', () => {
    const id = 1;
    component.showDetails(id);
    expect(navCtrlMock.navigateForward).toHaveBeenCalledWith(`/series/${id}`);
  });

  it('should delete tv show from favorites', async () => {
    const id = 1;
    await component.deleteTvShow(id);
    expect(seriesServiceMock.deleteSeriesFavorites).toHaveBeenCalledWith(id);
    expect(seriesServiceMock.getFavorites).toHaveBeenCalled();
  });
});
