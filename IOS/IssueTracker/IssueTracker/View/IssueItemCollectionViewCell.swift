//
//  IssueItemCollectionViewCell.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/11/04.
//

import UIKit

class IssueItemCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var issueImageLabel: UIImageView!
    @IBOutlet weak var issueWriterLabel: UILabel!
    @IBOutlet weak var issueDateLabel: UILabel!
    @IBOutlet weak var issueCommentLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        issueCommentLabel.translatesAutoresizingMaskIntoConstraints = false
        let labelInset = UIEdgeInsets(top: 10, left: 10, bottom: -10, right: -10)
        issueCommentLabel.leadingAnchor.constraint(equalTo: contentView.layoutMarginsGuide.leadingAnchor, constant: labelInset.left).isActive = true
        issueCommentLabel.trailingAnchor.constraint(equalTo: contentView.layoutMarginsGuide.trailingAnchor, constant: labelInset.right).isActive = true
        issueCommentLabel.bottomAnchor.constraint(equalTo: contentView.layoutMarginsGuide.bottomAnchor, constant: labelInset.bottom).isActive = true
    }
    
    override func prepareForReuse() { //cell재사용시 초기화
        super.prepareForReuse()
    }
    
    func setupCellValues(comment: Comment) {
        let url = URL(string: comment.user.profileURL)
        DispatchQueue.main.async {
            do {
                if let url = url {
                    let data = try Data(contentsOf: url)
                    self.issueImageLabel.image = UIImage(data: data)
                }
            } catch let error {
                debugPrint("ERRor ::\(error)")
            }
        }
        issueWriterLabel.text = comment.user.name
        issueCommentLabel.text = comment.contents
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        let date:Date = dateFormatter.date(from: comment.created)!
        dateFormatter.dateFormat = "MM월 dd일 HH:mm"
        issueDateLabel.text = dateFormatter.string(from: date)
        
    }
    
    override func preferredLayoutAttributesFitting(_ layoutAttributes: UICollectionViewLayoutAttributes) -> UICollectionViewLayoutAttributes {
        issueCommentLabel.preferredMaxLayoutWidth = layoutAttributes.size.width - contentView.layoutMargins.left - contentView.layoutMargins.left
        layoutAttributes.bounds.size.height = systemLayoutSizeFitting(UIView.layoutFittingCompressedSize).height
        return layoutAttributes
    }
    
    
}
