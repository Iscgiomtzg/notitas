import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { BoardService } from './../services/BoardServices/board.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  public boards: any = [];
  public name: any[] = [];
  public title: string = '';
  public content: string = '';
  public description: string = '';
  constructor( private boardService: BoardService, public dialog: MatDialog ){}

  ngOnInit(){
    this.getBoards();
  }

  private getBoards(){
    this.boardService.getBoards().subscribe( ( data: any ) => {
      this.boards = data;
    });
  }

  public refresh(){
    setTimeout( function() {
      window.location.reload();
    }, 100)
  }

  public addBoard(){
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {title: 'Agregar Board', content: this.content, description: this.description}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.content = result.content;
          this.boardService.createBoard(this.content, this.description).subscribe(data => {
            this.content = '';
            this.description = '';
            this.getBoards();
          });
          }
        }
      );
  }

}
