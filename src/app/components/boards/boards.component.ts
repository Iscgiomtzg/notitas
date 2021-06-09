import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/services/BoardServices/board.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})

export class BoardsComponent implements OnInit {
  public boardId: any = '';
  public dataBoard: any = {};
  public dataList: any = [];
  public listId: any = '';
  public cards: any = [];
  public title: string = '';
  public content: string = '';
  public description: string = '';
  public disabled: boolean = true;
  public type: number = 0;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id');
    this.getBoardData();
    this.getListOfBoardData();
  }

  public getBoardData(){
    this.boardService.getBoard(this.boardId).subscribe( data => {
      this.dataBoard = data;
    });
  }

  public getListOfBoardData(){
    this.boardService.getListOfBoard(this.boardId).subscribe( data => {
      console.log(data);
      this.dataList = data;
    })
  }

  public getCardsInList(id: any){
    this.disabled = false;
    this.listId = id;
    this.boardService.getCardInList(id).subscribe( data => {
      if(data.length){
        this.cards = data;
      } else {
        this.cards = null;
        this.snackBar.open('No hay Cards que mostrar', 'Cerrar', {
          duration: 5000,
        });
      }
    });
  }

  public openDialog(type: string, id?: any, name?: any, desc?: any): void {
    if(type === 'card' && id){
      this.title = 'Editar Card';
      this.content = name;
      this.description = desc;
      this.type = 1;
    } else if(type === 'list') {
      this.title = 'Agregar Lista';
      this.content = '';
      this.description = '';
      this.type = 3;
    } else {
      this.title = 'Crear Card';
      this.content = '';
      this.description = '';
      this.type = 2;
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title: this.title, content: this.content, description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.content = result.content;
        this.description = result.description;
        switch (this.type) {
          case 1:
            this.boardService.editCard(id, this.content, this.description).subscribe(data => {
              this.content = '';
              this.description = '';
              this.getCardsInList(this.listId);
            });
          break;
          case 2:
            this.boardService.createCard(this.listId, this.content, this.description).subscribe( data => {
              this.content = '';
              this.description = '';
              this.cards === null ? this.cards = [data] : this.cards.push(data);
            });
          break;
          case 3:
            this.boardService.createListOnBoard(this.boardId, this.content).subscribe( data => {
              this.dataList.push(data);
            });
          break;
        }
      }
    });
  }

  public deleteCard(id: string){
    this.boardService.deleteCard(id).subscribe( () => {
      this.getCardsInList(this.listId);
    });
  }

  public deleteList(id: string){
    console.log('Se esta eliminando')
  }
}
