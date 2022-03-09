import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Repository } from './models/repository.model';



interface SearchResult {
  total_count: number, 
  incomplete_results: boolean,
  items: Repository[]
}

@Injectable({
  providedIn: 'root'
})
export class GithubDataService {


  private urlAllRepos = 'https://api.github.com/repositories'
  private urlSearch = 'https://api.github.com/search/repositories?q='
  private urlRepoById = 'https://api.github.com/repositories/'

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Repository[]>(this.urlAllRepos)
  }

  getSearchResult(text:string){
    const urlPage = `+in:name&order=desc`;
    text=encodeURIComponent(text)
    const url = this.urlSearch+text+urlPage
    return this.http.get<SearchResult>(url)
    .pipe(
      switchMap(res=>[res.items])
      )
    }

  getOne(id:number){
    const url = this.urlRepoById+id
    return this.http.get<Repository>(url)
  }
}
