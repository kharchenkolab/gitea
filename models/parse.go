// defines parse result structures

package models

import "io"

// a status report on a file parse
type FileParseStatus struct {
	Status string // 'ok','warning','error','unknown'
	Message string
}

// a result of an annotation file parsing
type FileParseResult struct {
	Annotations []*DatasetAnnotation
	FileParseStatus
}

// quick statistics on the contained annotations
type AnnotationStats struct {
	Datasets map[string]int // number of cells per dataset
	Terms map[string]int // number of cells per term
	Files map[string]FileParseStatus
}


type AnnotationParser interface {
	ParseFile(io.Reader) *FileParseResult
}

type AnnotationWriter interface {
	WriteFile(io.Writer, *DatasetAnnotation)
}


