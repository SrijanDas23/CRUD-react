package com.srijan.crud.backend.controllers;

import com.srijan.crud.backend.dtos.GymRecordDto;
import com.srijan.crud.backend.entities.GymRecord;
import com.srijan.crud.backend.services.RecordsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class RecordsController {

    private final RecordsService recordsService;

    @GetMapping("/gym/records")
    public ResponseEntity<List<GymRecordDto>> allRecords(){
        return ResponseEntity.ok(recordsService.allRecords());
    }


    @PostMapping("/gym/records")
    public ResponseEntity<GymRecordDto> createGymRecord(@RequestBody GymRecordDto gymRecordDto){
        GymRecordDto createdGymRecord=recordsService.createGymRecord(gymRecordDto);
        return ResponseEntity.created(URI.create("/gym/records/"+createdGymRecord.getId())).body(createdGymRecord);
    }

    @DeleteMapping("/gym/records/{id}")
    public ResponseEntity<GymRecordDto> deleteGymRecord(@PathVariable Long id){
        return ResponseEntity.ok(recordsService.deleteGymRecord(id));
    }

    @PutMapping("/records/{id}")
    public ResponseEntity<GymRecordDto> updateGymRecord(@PathVariable Long id, @RequestBody GymRecordDto recordDto) {
        return ResponseEntity.ok(recordsService.updateGymRecord(id, recordDto));
    }
}
