import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VideoService} from "../video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VideoDto} from "../dto/VideoDto";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent {
  saveVideoMetadataForm: FormGroup = new FormGroup({});
  videoId: string | null = '';

  videoDto: VideoDto = {} as VideoDto;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  announcer = inject(LiveAnnouncer);

  ngOnInit(): void {
    this.initForm();
  }

  constructor(private formBuilder: FormBuilder,
              private videoService: VideoService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  initForm() {
    this.videoId = this.activatedRoute.snapshot.paramMap.get('videoId');

    this.saveVideoMetadataForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      videoStatus: new FormControl('', Validators.required),
    });
  }

  // mat chip start

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  // mat chip end

  onSubmit() {
    if (this.saveVideoMetadataForm.valid) {
      console.log(this.saveVideoMetadataForm.value);

      // prepare dto
      if (this.videoId != null) {
        this.videoDto.id = this.videoId;

        this.videoDto.title = this.saveVideoMetadataForm.value.title;
        this.videoDto.description = this.saveVideoMetadataForm.value.description;
        this.videoDto.videoStatus = this.saveVideoMetadataForm.value.videoStatus;
        this.videoDto.tags = this.tags;
      } else {
        this.router.navigate(['/']);
      }

      this.videoService.updateVideoMetaData(this.videoDto).subscribe(
        response => {
          console.log("Video uploaded successfully", response);
          this.initForm();
          this.tags = [];
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
