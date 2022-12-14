import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from 'src/app/models/article';
import { Published } from 'src/app/models/published';
import { ArticleService } from 'src/app/services/article.service';
import { PublishService } from 'src/app/services/publish.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article[] = [];
  publishData: Published = {
    id: 0,
    articleId: 0,
    title: '',
    description: ''
  };

  closeResult: string = '';
  selectedArticle!: Article;

  constructor(
    private modalService: NgbModal,
    private articleService: ArticleService,
    private publishService: PublishService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.getList();
  }

  pulishedToHome(payload: Article) {

    this.publishData = {
      id: 0,
      articleId: payload.id,
      title: payload.title,
      description: payload.description
    }

    this.publishService.publishThis(this.publishData)
    .subscribe({
      next:(data)=>{
        this.router.navigate(["/home"]);
      },
      error:(err)=> {
        console.log(err);
      }
    })
  }

  getList() {
    this.articleService.get().subscribe((data: any) => {
      this.article = data;
    });
  }

  deleteById() {
    this.articleService.delete(this.selectedArticle.id).subscribe({
      next: (data: any) => {
        this.article = this.article.filter(item => item.id != this.selectedArticle.id)
      },
    });
  }

  openDeleteModel(theArticle: Article, content: any) {
    this.selectedArticle = theArticle;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any) {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
