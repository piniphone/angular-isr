import { Component, OnInit } from '@angular/core';
// import { ModalizerService } from 'src/app/mods/modalizer/services/modalizer.service';



@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  constructor(
    // private modalizerService: ModalizerService
  ) {}

  async ngOnInit() {
  }

  async openModal() {
    // this.modalService.appendModal()
  }

}
