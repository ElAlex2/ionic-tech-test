import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SeriesService } from './series-service.service';
import { Show, SearchResultShow } from './types';
import { environment } from 'src/environments/environment';

describe('SeriesService', () => {
  let service: SeriesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeriesService]
    });

    service = TestBed.inject(SeriesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return series by search term', () => {
    const term = 'test';
    const mockResults: SearchResultShow[] = [{ show: { id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8.5 } }, score: 3 }];
    const expectedResponse = { shows: [{ id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8.5 } }], genres: ['Drama'] };

    service.getSeriesBySearchTerm(term).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${environment.baseSearchUrl}?q=${term}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResults);
  });

  it('should return series by genre', () => {
    const page = 0;
    const mockResults: Show[] = [{ id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8.5 } }];
    const expectedResponse = { shows: [{ id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8.5 } }], genres: ['Drama'] };

    service.getSeriesByGenre(page).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResults);
  });

  it('should return series details', () => {
    const id = 1;
    const mockResult: Show = { id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8.5 } };

    service.getSeriesDetails(id).subscribe((response) => {
      expect(response).toEqual(mockResult);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResult);
  });

  it('should return favorites from localStorage', () => {
    const mockFavorites: Show[] = [{ id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8.5 } }];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockFavorites));

    const favorites = service.getFavorites();

    expect(favorites).toEqual(mockFavorites);
  });

  it('should add series to favorites', () => {
    const mockShow: Show = { id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8.5 } };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([]));
    const setItemSpy = spyOn(localStorage, 'setItem');

    const added = service.addSeriesFavorites(mockShow);

    expect(added).toBeTruthy();
    expect(setItemSpy).toHaveBeenCalledWith('seriesAppTechTest', JSON.stringify([mockShow]));
  });

  it('should delete series from favorites', () => {
    const id = 1;
    const mockFavorites: Show[] = [{ id: 1, name: 'Test Show', genres: ['Drama'], rating: { average: 8.5 } }];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockFavorites));
    const setItemSpy = spyOn(localStorage, 'setItem');

    service.deleteSeriesFavorites(id);

    expect(setItemSpy).toHaveBeenCalledWith('seriesAppTechTest', JSON.stringify([]));
  });
});
