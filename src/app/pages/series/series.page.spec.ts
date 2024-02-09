import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, LoadingController, NavController } from '@ionic/angular';
import { SeriesPage } from './series.page';
import { SeriesService } from 'src/app/services/series-service.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SeriesPage', () => {
  let component: SeriesPage;
  let fixture: ComponentFixture<SeriesPage>;
  let seriesServiceMock: jasmine.SpyObj<SeriesService>;
  let loadingControllerMock: jasmine.SpyObj<LoadingController>;
  let navCtrlMock: jasmine.SpyObj<NavController>;

  beforeEach(waitForAsync(() => {
    seriesServiceMock = jasmine.createSpyObj('SeriesService', ['getSeriesByGenre', 'getSeriesBySearchTerm']);
    loadingControllerMock = jasmine.createSpyObj('LoadingController', ['create', 'dismiss']);
    navCtrlMock = jasmine.createSpyObj('NavController', ['navigateForward']);

    TestBed.configureTestingModule({
      declarations: [SeriesPage],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesPage);
    component = fixture.componentInstance;
    
    seriesServiceMock.getSeriesByGenre.and.returnValue(of({ shows: [], genres: [] }));
    seriesServiceMock.getSeriesBySearchTerm.and.returnValue(of({ shows: [], genres: [] }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load series on ngOnInit', async () => {
    await component.ngOnInit();
    expect(loadingControllerMock.create).toHaveBeenCalledTimes(2);
    expect(seriesServiceMock.getSeriesByGenre).toHaveBeenCalledTimes(2);
    expect(component.series.length).toBe(0);
    expect(component.seriesBackup.length).toBe(0);
    expect(component.genres.length).toBe(0);
  });

  it('should search for series', async () => {
    component.searchQuery = 'test';
    await component.search();
    expect(loadingControllerMock.create).toHaveBeenCalledTimes(2);
    expect(seriesServiceMock.getSeriesBySearchTerm).toHaveBeenCalledWith('test');
    expect(component.series.length).toBe(0);
    expect(component.seriesBackup.length).toBe(0);
    expect(component.genres.length).toBe(0);
  });

  it('should show details for a series', () => {
    const id = 1;
    component.showDetails(id);
    expect(navCtrlMock.navigateForward).toHaveBeenCalledWith(`/series/${id}`);
  });

  it('should filter series by genre', () => {
    const event = { detail: { value: ['Drama'] } };
    component.seriesBackup = [
      { id: 1, name: 'Test Show 1', genres: ['Drama'], rating: { average: 8.5 } },
      { id: 2, name: 'Test Show 2', genres: ['Comedy'], rating: { average: 7.5 } }
    ];

    component.onGenreChange(event as CustomEvent);

    expect(component.series.length).toBe(1);
    expect(component.series[0].id).toBe(1);
  });
});
