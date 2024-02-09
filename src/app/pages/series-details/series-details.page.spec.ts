import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SeriesDetailsPage } from './series-details.page';
import { SeriesService } from 'src/app/services/series-service.service';
import { of } from 'rxjs';
import { Show } from 'src/app/services/types';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SeriesDetailsPage', () => {
  let component: SeriesDetailsPage;
  let fixture: ComponentFixture<SeriesDetailsPage>;
  let mockSeriesService: jasmine.SpyObj<SeriesService>;

  beforeEach(waitForAsync(() => {
    mockSeriesService = jasmine.createSpyObj(['getSeriesDetails', 'addSeriesFavorites']);

    TestBed.configureTestingModule({
      declarations: [SeriesDetailsPage],
      imports: [HttpClientModule],
      providers: [HttpClient,
        {
          provide: ActivatedRoute, useValue: {
            params: of({
              id: 123,
            })
          }
        },
        { provide: SeriesService, useValue: mockSeriesService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch series details on ngOnInit', () => {
    const seriesDetails: Show = { id: 123, name: 'Test Series', genres: [] };
    mockSeriesService.getSeriesDetails.and.returnValue(of(seriesDetails));

    component.ngOnInit();

    expect(component.serie).toEqual(seriesDetails);
  });

  it('should add series to favorites', () => {
    component.serie = { id: 123, name: 'Test Series', genres: [] };
    mockSeriesService.addSeriesFavorites;

    component.addFavorite();

    expect(mockSeriesService.addSeriesFavorites).toHaveBeenCalledWith(component.serie);
  });
});
