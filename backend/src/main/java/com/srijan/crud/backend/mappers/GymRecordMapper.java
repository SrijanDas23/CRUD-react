package com.srijan.crud.backend.mappers;

import com.srijan.crud.backend.dtos.GymRecordDto;
import com.srijan.crud.backend.entities.GymRecord;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GymRecordMapper {

    GymRecord toGymRecord(GymRecordDto dto);

    GymRecordDto toGymRecordDto(GymRecord gymRecord);

    List<GymRecordDto> toGymRecordDtos(List<GymRecord> gymRecords);

    void updateGymRecord(@MappingTarget GymRecord target, GymRecord source);
}
