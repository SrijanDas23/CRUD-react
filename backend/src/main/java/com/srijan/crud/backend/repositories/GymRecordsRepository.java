package com.srijan.crud.backend.repositories;

import com.srijan.crud.backend.entities.GymRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymRecordsRepository extends JpaRepository<GymRecord, Long> {

}
