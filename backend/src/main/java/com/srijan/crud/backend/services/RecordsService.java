package com.srijan.crud.backend.services;

import com.srijan.crud.backend.dtos.GymRecordDto;
import com.srijan.crud.backend.entities.GymRecord;
import com.srijan.crud.backend.exceptions.AppException;
import com.srijan.crud.backend.mappers.GymRecordMapper;
import com.srijan.crud.backend.repositories.GymRecordsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordsService {

    private final GymRecordsRepository gymRecordsRepository;
    private final GymRecordMapper gymRecordMapper;

    public List<GymRecordDto> allRecords(){
        return gymRecordMapper.toGymRecordDtos(gymRecordsRepository.findAll());
    }

    public GymRecordDto createGymRecord(GymRecordDto gymRecordDto){
        GymRecord gymRecord=gymRecordMapper.toGymRecord(gymRecordDto);

        GymRecord createdGymRecord=gymRecordsRepository.save(gymRecord);
        return gymRecordMapper.toGymRecordDto(createdGymRecord);
    }

    public GymRecordDto deleteGymRecord(Long id){
        GymRecord gymRecord=gymRecordsRepository.findById(id)
                .orElseThrow(()->new AppException("Gym record not found", HttpStatus.NOT_FOUND));

        GymRecordDto gymRecordDto=gymRecordMapper.toGymRecordDto(gymRecord);
        gymRecordsRepository.deleteById(id);

        return gymRecordDto;
    }

    public GymRecordDto updateGymRecord(Long id, GymRecordDto recordDto) {
        GymRecord record = gymRecordsRepository.findById(id)
                .orElseThrow(() -> new AppException("Gym record not found", HttpStatus.NOT_FOUND));

        gymRecordMapper.updateGymRecord(record, gymRecordMapper.toGymRecord(recordDto));

        GymRecord savedGymRecord = gymRecordsRepository.save(record);

        return gymRecordMapper.toGymRecordDto(savedGymRecord);
    }
}
