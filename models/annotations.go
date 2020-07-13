// The models roughly based on the cap-examples structure

package models


// Captures a basic unit of annotation - a mapping of a term to a set of cells
type AnnotationBlock struct {
	Term  string
	Cells []string
}

// Dataset definition (name and metadata properties)
type Dataset struct {
        Name string
	Properties map[string]string
}

// A set of annotation blocks oreported for a given dataset
type DatasetAnnotation struct {
	Dataset Dataset
	Annotations []AnnotationBlock
}

