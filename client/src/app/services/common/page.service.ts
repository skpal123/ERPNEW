import { Injectable } from '@angular/core';
import { Page } from '../../models/common/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  page:Page={
    totalItems: 0,
    currentPage:0,
    pageSize:0,
    totalPages:0,
    startPage:0,
    endPage: 0,
    startIndex: 0,
    endIndex: 0,
    pages: []
  }
  constructor() { }
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) { 
        currentPage = 1; 
    } else if (currentPage > totalPages) { 
        currentPage = totalPages; 
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
        this.page.totalItems=totalItems,
        this.page.currentPage=currentPage,
        this.page.pageSize= pageSize,
        this.page.totalPages= totalPages,
        this.page.startPage= startPage,
        this.page.endPage= endPage,
        this.page.startIndex= startIndex,
        this.page.endIndex= endIndex,
        this.page.pages= pages
    return this.page;
}
}
